using System;

namespace LotterySystem.Model
{
    public class cz_users
    {
        private string u_id;
        private string u_name;
        private string u_psw;
        private string salt;
        private string u_nicker;
        private string u_skin;
        private string sup_name;
        private string u_type;
        private string su_type;
        private DateTime add_date;
        private DateTime last_changedate;
        private int six_rate;
        private decimal six_credit;
        private decimal six_usable_credit;
        private string six_kind;
        private int a_state;
        private string allow_sale;
        private int? allow_view_report;
        private int six_allow_maxrate;
        private int six_low_maxrate;
        private int six_rate_owner;
        private int six_iscash;
        private int allow_opt;
        private int is_changed;
        private int kc_rate;
        private int kc_credit;
        private int kc_usable_credit;
        private int kc_kind;
        private int kc_allow_sale;
        private int negative_sale;
        private int kc_allow_maxrate;
        private int kc_low_maxrate;
        private int kc_rate_owner;
        private int kc_crash_payment;
        private int kc_iscash;
        private int six_op_odds;
        private int kc_op_odds;
        private int kc_isauto_back;
        private int six_isauto_back;
        private int retry_times;

        
        
	public string get_u_id() {
		return u_id;
	}

	public void set_u_id(string u_id) {
		this.u_id = u_id;
	}
	public void set_retry_times(int retry_times) {
		this.retry_times = retry_times;
	}
        
	public int get_retry_times() {
		return retry_times;
	}
	public string get_u_name() {
		return u_name;
	}

	public void set_u_name(string u_name) {
		this.u_name = u_name;
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

	public string get_sup_name() {
		return sup_name;
	}

	public void set_sup_name(string sup_name) {
		this.sup_name = sup_name;
	}

	public string get_u_type() {
		return u_type;
	}

	public void set_u_type(string u_type) {
		this.u_type = u_type;
	}

	public string get_su_type() {
		return su_type;
	}

	public void set_su_type(string su_type) {
		this.su_type = su_type;
	}

	public DateTime get_add_date() {
		return add_date;
	}

	public void set_add_date(DateTime add_date) {
		this.add_date = add_date;
	}
	public DateTime get_last_changedate() {
		return last_changedate;
	}

	public void set_last_changedate(DateTime last_changedate) {
		this.last_changedate = last_changedate;
	}

	public int get_six_rate() {
		return six_rate;
	}

	public void set_six_rate(int six_rate) {
		this.six_rate = six_rate;
	}
	public int get_negative_sale() {
		return negative_sale;
	}

	public void set_negative_sale(int negative_sale) {
		this.negative_sale = negative_sale;
	}

	public decimal get_six_credit() {
		return six_credit;
	}

	public void set_six_credit(decimal six_credit) {
		this.six_credit = six_credit;
	}

	public decimal get_six_usable_credit() {
		return six_usable_credit;
	}

	public void set_six_usable_credit(decimal six_usable_credit) {
		this.six_usable_credit = six_usable_credit;
	}

	public string get_six_kind() {
		return six_kind;
	}

	public void set_six_kind(string six_kind) {
		this.six_kind = six_kind;
	}

	public int get_a_state() {
		return a_state;
	}

	public void set_a_state(int a_state) {
		this.a_state = a_state;
	}

	public string get_allow_sale() {
		return allow_sale;
	}

	public void set_allow_sale(string allow_sale) {
		this.allow_sale = allow_sale;
	}

	public int? get_allow_view_report() {
		return allow_view_report;
	}

	public void set_allow_view_report(int allow_view_report) {
		this.allow_view_report = allow_view_report;
	}

	public int get_six_allow_maxrate() {
		return six_allow_maxrate;
	}

	public void set_six_allow_maxrate(int six_allow_maxrate) {
		this.six_allow_maxrate = six_allow_maxrate;
	}

	public int get_six_low_maxrate() {
		return six_low_maxrate;
	}

	public void set_six_low_maxrate(int six_low_maxrate) {
		this.six_low_maxrate = six_low_maxrate;
	}

	public int get_six_rate_owner() {
		return six_rate_owner;
	}

	public void set_six_rate_owner(int six_rate_owner) {
		this.six_rate_owner = six_rate_owner;
	}

	public int get_six_iscash() {
		return six_iscash;
	}

	public void set_six_iscash(int six_iscash) {
		this.six_iscash = six_iscash;
	}

	public int get_allow_opt() {
		return allow_opt;
	}

	public void set_allow_opt(int allow_opt) {
		this.allow_opt = allow_opt;
	}

	public int get_is_changed() {
		return is_changed;
	}

	public void set_is_changed(int is_changed) {
		this.is_changed = is_changed;
	}

	public int get_kc_rate() {
		return kc_rate;
	}

	public void set_kc_rate(int kc_rate) {
		this.kc_rate = kc_rate;
	}

	public int get_kc_credit() {
		return kc_credit;
	}

	public void set_kc_credit(int kc_credit) {
		this.kc_credit = kc_credit;
	}

	public int get_kc_usable_credit() {
		return kc_usable_credit;
	}

	public void set_kc_usable_credit(int kc_usable_credit) {
		this.kc_usable_credit = kc_usable_credit;
	}

	public int get_kc_kind() {
		return kc_kind;
	}

	public void set_kc_kind(int kc_kind) {
		this.kc_kind = kc_kind;
	}

	public int get_kc_allow_sale() {
		return kc_allow_sale;
	}

	public void set_kc_allow_sale(int kc_allow_sale) {
		this.kc_allow_sale = kc_allow_sale;
	}

	public int get_kc_allow_maxrate() {
		return kc_allow_maxrate;
	}

	public void set_kc_allow_maxrate(int kc_allow_maxrate) {
		this.kc_allow_maxrate = kc_allow_maxrate;
	}

	public int get_kc_low_maxrate() {
		return kc_low_maxrate;
	}

	public void set_kc_low_maxrate(int kc_low_maxrate) {
		this.kc_low_maxrate = kc_low_maxrate;
	}

	public int get_kc_rate_owner() {
		return kc_rate_owner;
	}

	public void set_kc_rate_owner(int kc_rate_owner) {
		this.kc_rate_owner = kc_rate_owner;
	}

	public int get_kc_crash_payment() {
		return kc_crash_payment;
	}

	public void set_kc_crash_payment(int kc_crash_payment) {
		this.kc_crash_payment = kc_crash_payment;
	}

	public int get_kc_iscash() {
		return kc_iscash;
	}

	public void set_kc_iscash(int kc_iscash) {
		this.kc_iscash = kc_iscash;
	}

	public int get_six_op_odds() {
		return six_op_odds;
	}

	public void set_six_op_odds(int six_op_odds) {
		this.six_op_odds = six_op_odds;
	}

	public int get_kc_op_odds() {
		return kc_op_odds;
	}

	public void set_kc_op_odds(int kc_op_odds) {
		this.kc_op_odds = kc_op_odds;
	}

	public int get_kc_isauto_back() {
		return kc_isauto_back;
	}

	public void set_kc_isauto_back(int kc_isauto_back) {
		this.kc_isauto_back = kc_isauto_back;
	}

	public int get_six_isauto_back() {
		return six_isauto_back;
	}

	public void set_six_isauto_back(int six_isauto_back) {
		this.six_isauto_back = six_isauto_back;
	}

        
    }
}