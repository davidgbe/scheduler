require 'open-uri'
require 'json'
require 'yaml'

class SocParser

  def initialize(school)
    school_endpoints = {
      usc: {
        terms: 'http://web-app.usc.edu/web/soc/api/terms',
        session: 'http://web-app.usc.edu/web/soc/api/session/001/20071',
        departments: 'http://web-app.usc.edu/web/soc/api/departments/20071',
        courses: 'http://web-app.usc.edu/web/soc/api/classes/code/20071'
      }
    }
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
    raw_departments = JSON.parse(open(@endpoints['deparments']).read)
    @departments = raw_departments.has_key?('department') ? raw_departments['department'] : nil
    parse_for_department_codes
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

  def fetch_class_data

  end

end