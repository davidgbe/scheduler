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
      last_teacher = nil
      if sections.is_a?(Hash)
        #there's just single section
        last_teacher = parse_section(sections, klass, last_teacher)
      elsif sections.is_a?(Array)
        #multiple
        sections.each do |section|
          last_teacher = parse_section(section, klass, last_teacher)
        end
      else 
        return
      end
    end
  end

  def parse_section section, klass, last_teacher
    if !section.is_a?(Hash)
      return
    end
    section_data = {
      days: section['day'].to_s,
      start: section['start_time'].to_s,
      finish: section['end_time'].to_s,
      max_capacity: section['spaces_available'].to_i,
      current_capacity: section['number_registered'].to_i,
      klass_id: klass.id
    }
    section_data.each do |key,value|
      if value.is_a?(Hash)
        raise section.to_s
      end
    end
    section_instance = Section.find_or_create_by(section_data)
    if section.has_key?('instructor')
      instructor = section['instructor']
      to_return = nil
      if instructor.is_a?(Hash) 
        to_return = parse_instructor(instructor, section_instance)
      elsif instructor.is_a?(Array)
        instructor.each do |single_instructor| 
          to_return = parse_instructor(single_instructor, section_instance)
        end
      end
      to_return
    else 
      if last_teacher.present?
        section_instance.sections_teachers_relations.create(teacher_id: last_teacher.id)
      end
      last_teacher
    end
  end

  def parse_instructor instructor, section
    if instructor.nil?
      raise instructor.inspect
    end
    ins_data = {
      first_name: (instructor.has_key?('first_name')) ? instructor['first_name'] : nil,
      last_name: (instructor.has_key?('last_name')) ? instructor['last_name'] : nil
    }
    ins_instance = Teacher.find_or_create_by(ins_data)
    section.sections_teachers_relations.create(teacher_id: ins_instance.id)
    ins_instance
  end
end