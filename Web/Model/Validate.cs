using System;
using System.Drawing;
using System.Web;

namespace LotterySystem.Model
{
    public class Validate
    {
        public float ValidateCodeSize;
        public int ImageHeight;
        public Color DrawColor;
        public string ValidateCodeFont;
        public bool FontTextRenderingHint;
        public string AllChar;

        public void set_ValidateCodeCount(int i)
        {
            throw new System.NotImplementedException();
        }

        public void OutPutValidate(string lotterySessionImgCode)
        {
            var substring = Guid.NewGuid().ToString().Substring(0, 5);
            HttpContext.Current.Session[lotterySessionImgCode] = substring;
        }
    }
}