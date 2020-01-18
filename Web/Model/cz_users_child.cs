using System;

namespace LotterySystem.Model
{
    public class cz_users_child
    {
        private string u_id;
        private string u_name;
        private string u_nicker;
        private string u_skin;
        private string u_psw;
        private string salt;
        private string  parent_u_name;
        private DateTime add_date;
        private DateTime last_changedate;
        private int status;
        private string permissions_name;
        private int retry_times;
        private int is_changed;
        
        
        
        public string get_u_id() {
            return u_id;
        }

        public void set_retry_times(int retry_times) {
            this.retry_times = retry_times;
        }
        
        public int get_retry_times() {
            return retry_times;
        }

        public void set_u_id(string u_id) {
            this.u_id = u_id;
        }
        public int get_is_changed() {
            return is_changed;
        }

        public void set_is_changed(int is_changed) {
            this.is_changed = is_changed;
        }
        public string get_u_name() {
            return u_name;
        }

        public void set_u_name(string u_name) {
            this.u_name = u_name;
        }

        public string get_u_nicker() {
            return u_nicker;
        }

        public void set_u_nicker(string u_nicker) {
            this.u_nicker = u_nicker;
        }

        public string get_u_skin() {
            return u_skin;
        }

        public void set_u_skin(string u_skin) {
            this.u_skin = u_skin;
        }

        public string get_u_psw() {
            return u_psw;
        }

        public void set_u_psw(string u_psw) {
            this.u_psw = u_psw;
        }

        public string get_salt() {
            return salt;
        }

        public void set_salt(string salt) {
            this.salt = salt;
        }

        public string get_parent_u_name() {
            return parent_u_name;
        }

        public void set_parent_u_name(string parent_u_name) {
            this.parent_u_name = parent_u_name;
        }

        public DateTime get_add_date() {
            return add_date;
        }

        public void set_last_changedate(DateTime last_changedate) {
            this.last_changedate = last_changedate;
        }
        public DateTime get_last_changedate() {
            return last_changedate;
        }

        public void set_add_date(DateTime add_date) {
            this.add_date = add_date;
        }

        public int get_status() {
            return status;
        }

        public void set_status(int status) {
            this.status = status;
        }

        public string get_permissions_name() {
            return permissions_name;
        }

        public void set_permissions_name(string permissions_name) {
            this.permissions_name = permissions_name;
        }


        public string get_is_admin()
        {
            throw new NotImplementedException();
        }
    }
}