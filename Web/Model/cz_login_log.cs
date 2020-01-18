using System;

namespace LotterySystem.Model
{
    public class cz_login_log
    {
        private string ip;
        private DateTime? login_time;
        private string u_name;
        private string browser_type;

        
        
        
        public string get_ip() {
            return ip;
        }

        public void set_ip(string ip) {
            this.ip = ip;
        }

        public DateTime? get_login_time() {
            return login_time;
        }

        public void set_login_time(DateTime? login_time) {
            this.login_time = login_time;
        }

        public string get_u_name() {
            return u_name;
        }

        public void set_u_name(string u_name) {
            this.u_name = u_name;
        }

        public string get_browser_type() {
            return browser_type;
        }

        public void set_browser_type(string browser_type) {
            this.browser_type = browser_type;
        }

    }
}