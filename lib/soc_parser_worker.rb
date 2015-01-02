require 'open-uri'
require 'json'
require 'yaml'

class SocParserWorker

  def initialize(school)
    school_endpoints = YAML.load_file(Rails.root.to_s + '/config/soc.yml')
    if !school_endpoints.has_key?(school)
      raise 'We do not support this school'
    end
    @endpoints = school_endpoints[school]
  end

  def fetch_active_term
    if !@endpoints.has_key?('term') || !@endpoints['term']
      raise 'There is no current term'
    end
    @term = @endpoints['term'].to_s
  end

  def fetch_active_session session_code
    fetch_active_term if !@term 
    if !@endpoints.has_key?('session')
      raise 'There is no listed endpoint for fetching session'
    end
    url = @endpoints['session'].sub('term', @term).sub('session_code', session_code)
    session_data = JSON.parse(open(url).read)
  end

  def fetch_departments 
    if !@endpoints.has_key?('departments') || !@endpoints['departments']
      raise 'There is no listed endpoint for fetching deparments'
    end
    url = @endpoints['departments'].sub('term', @term)
    raw_departments = JSON.parse(open(url).read)
    @departments = raw_departments.has_key?('department') ? raw_departments['department'] : nil
    parse_for_department_codes @departments
    @departments
  end

  def parse_for_department_codes departments
    if departments
      @department_codes ||= [].to_set
      departments.each do |obj|
        if !obj.is_a?(Hash)
          next
        end
        if obj.has_key? 'code'
          @department_codes.add obj['code']
        end
        if obj.has_key? 'department'
          parse_for_department_codes obj['department']
        end
      end
    end
  end

  def fetch_courses_data
    fetch_active_term if !@term
    fetch_departments if !@department_codes
    base_subject_url = @endpoints['courses'].sub('term', @term)
    @department_codes.each do |code|
      tailored_url = base_subject_url.sub('dept_code', code)
      department_data = JSON.parse(open(tailored_url).read)
      parse_for_department_info department_data, code
    end
  end

  def parse_for_department_info department_data, code
    if !department_data.has_key?('OfferedCourses') || !department_data['OfferedCourses'].has_key?('course')
      return
    end
    dept_name = ''
    if department_data.has_key?('Dept_Info')
      dept_info = department_data['Dept_Info']
      if dept_info.has_key?('department')
        dept_name = department_data['Dept_Info']['department']
      end
    end
    parse_for_classes_info department_data['OfferedCourses']['course'], code, dept_name
  end

  def parse_for_classes_info klasses, code, dept_name
    if klasses
      all_klasses = []
      klasses.each do |klass|
        next if !klass.is_a?(Hash) || !klass.has_key?('CourseData')
        dept_title = klass['PublishedCourseID']
        klass = klass['CourseData']
        klass_data = {
          title: klass['title'],
          level: klass['number'].to_i,
          units: klass['units'].to_i,
          description: klass['description'].to_s,
          subject: dept_name,
          dept_title: dept_title
        }
        klass_data['prerequisites'] = klass['prereq_text'].to_s if !klass['prereq_text'].empty?
        klass_data['corequisites'] = klass['coreq_text'].to_s if !klass['coreq_text'].empty?
        klass_data.each do |key,value|
          if value.is_a?(Hash)
            raise klass_data.to_s
          end
        end
        klass_instance = Klass.find_or_create_by(klass_data)
        parse_for_sections_info klass['SectionData'], klass_instance
      end
    end
  end

  def parse_for_sections_info sections, klass
    if sections
      all_sections = []
      sections.each do |section|
        if !section.is_a?(Hash)
          next
        end
        section_data = {
          days: section['day'].to_s,
          start: section['start_time'].to_s,
          finish: section['end_time'].to_s,
          max_capacity: section['spaces_available'].to_i,
          current_capacity: section['number_registered'].to_i
        }
        section_data.each do |key,value|
          if value.is_a?(Hash)
            raise section.to_s
          end
        end
        all_sections << section_data
      end
      Section.create all_sections do |s|
        s.klass_id = klass.id
      end
    end
  end

end