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

  def fetch_active_terms
    if !@endpoints.has_key?('terms')
      raise 'There is no listed endpoint for fetching terms'
    end
    @terms = JSON.parse(open(@endpoints['terms']).read)
  end

  def fetch_active_sessions
    if !@endpoints.has_key?('sessions')
      raise 'There is no listed endpoint for fetching sessions'
    end
    @sessions = JSON.parse(open(@endpoints['sessions']).read)
  end

  def fetch_departments 
    if !@endpoints.has_key?('departments')
      raise 'There is no listed endpoint for fetching deparments'
    end
    raw_departments = JSON.parse(open(@endpoints['departments']).read)
    @departments = raw_departments.has_key?('department') ? raw_departments['department'] : nil
    parse_for_department_codes
    @departments
  end

  def parse_for_department_codes
    if @departments
      @department_codes = []
      @departments.each do |obj|
        if obj.has_key? 'code'
          @department_codes << obj['code']
        end
      end
      @department_codes
    end
  end

  def fetch_courses_data
    fetch_departments if !@department_codes
    base_subject_url = @endpoints['courses']
    @department_codes.each do |code|
      tailored_url = base_subject_url.sub('code', code)
      department_data = JSON.parse(open(tailored_url).read)
      parse_for_department_info department_data, code
    end
  end

  def parse_for_department_info department_data, code
    if !department_data.has_key?('OfferedCourses') || !department_data['OfferedCourses'].has_key?('course')
      return
    end
    parse_for_classes_info department_data['OfferedCourses']['course'], code
  end

  def parse_for_classes_info klasses, code
    if klasses
      all_klasses = []
      klasses.each do |klass|
        next if !klass.is_a?(Hash) || !klass.has_key?('CourseData')
        klass = klass['CourseData']
        klass_data = {
          title: klass['title'],
          level: klass['number'].to_i,
          units: klass['units'].to_i,
          description: klass['description'].to_s
        }
        klass_data['prerequisites'] = klass['prereq_text'].to_s if !klass['prereq_text'].empty?
        klass_data['corequisites'] = klass['coreq_text'].to_s if !klass['coreq_text'].empty?
        klass_data.each do |key,value|
          if value.is_a?(Hash)
            raise klass_data.to_s
          end
        end
        all_klasses << klass_data
      end
      Klass.create all_klasses do |k|
        k.subject = code
      end
    end
  end

  def parse_for_sections_info
  end

end