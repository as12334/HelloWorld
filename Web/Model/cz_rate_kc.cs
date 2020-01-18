using System;

namespace LotterySystem.Model
{
    public class cz_rate_kc
    {
        private string u_name;
        private string u_type;
        private string dl_name;
        private string zd_name;
        private string gd_name;
        private string fgs_name;
        private int  dl_rate;
        private int  zd_rate;
        private int  gd_rate;
        private int  fgs_rate;
        private decimal  zj_rate;
        
        
        public string get_u_name() {
            return u_name;
        }

        public void set_u_name(string u_name) {
            this.u_name = u_name;
        }

        public string get_u_type() {
            return u_type;
        }

        public void set_u_type(string u_type) {
            this.u_type = u_type;
        }

        public string get_dl_name() {
            return dl_name;
        }

        public void set_dl_name(string dl_name) {
            this.dl_name = dl_name;
        }

        public string get_zd_name() {
            return zd_name;
        }

        public void set_zd_name(string zd_name) {
            this.zd_name = zd_name;
        }

        public string get_gd_name() {
            return gd_name;
        }

        public void set_gd_name(string gd_name) {
            this.gd_name = gd_name;
        }

        public string get_fgs_name() {
            return fgs_name;
        }

        public void set_fgs_name(string fgs_name) {
            this.fgs_name = fgs_name;
        }

        public int get_dl_rate() {
            return dl_rate;
        }

        public void set_dl_rate(int dl_rate) {
            this.dl_rate = dl_rate;
        }

        public int get_zd_rate() {
            return zd_rate;
        }

        public void set_zd_rate(int zd_rate) {
            this.zd_rate = zd_rate;
        }

        public int get_gd_rate() {
            return gd_rate;
        }

        public void set_gd_rate(int gd_rate) {
            this.gd_rate = gd_rate;
        }

        public int get_fgs_rate() {
            return fgs_rate;
        }

        public void set_fgs_rate(int fgs_rate) {
            this.fgs_rate = fgs_rate;
        }

        public decimal get_zj_rate() {
            return zj_rate;
        }

        public void set_zj_rate(decimal zj_rate) {
            this.zj_rate = zj_rate;
        }

    }
}