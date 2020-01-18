function GameMiddle(msg) {
    var gameIndex = msg.gameIndex;
    var type = msg.type;
    var oddsList = msg.data.oddsList;
    var num, sort, str, sortIndex, disabled = "", data_type = [];
    var _dx = function (index) { switch (index) { case 1: return "一"; case 2: return "二"; case 3: return "三"; case 4: return "四"; case 5: return "五"; case 6: return "六"; case 7: return "七"; case 8: return "八"; } };
    var htmlData = ["<div class='game_ball_wrap game_item_wrap base-clear'>"];
    if (gameIndex == 1) {
        $(".rightBox div.left li").removeClass("active");
        $(".rightBox div.right ul").removeClass("active");
        $(".rightBox div.left li[name='lmResult']").css("display", "none");
        $(".rightBox div.left li[name='putResult']").addClass("active");
        $(".rightBox div.right #putResult").addClass("active");
        if (type == 1 || type == 2) {
            knResult(); //创建快捷下注模块
            if (type == 1) {
                str = "特碼A";
                sortIndex = 0;
                data_type[0] = "active";
                data_type[1] = "";
            } else if (type == 2) {
                str = "特碼B";
                sortIndex = 65;
                data_type[0] = "";
                data_type[1] = "active";
            }
            htmlData.push("<div class='game_lm_title kc_lm_title'>");
            htmlData.push("<ul id='gameTitle' class='base-clear'>");
            htmlData.push("<li class='" + data_type[0] + "' data-action='gamedata&gameIndex=1&type=1'><h3>特碼A</h3></li>");
            htmlData.push("<li class='" + data_type[1] + "' data-action='gamedata&gameIndex=1&type=2'><h3>特碼B</h3></li>");
            htmlData.push("</ul>");
            htmlData.push("</div>"); //game_lm_title end

            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>" + str + "</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 10; n++) {
                for (var i = n; i <= 49; i = i + 10) {
                    num = i < 10 ? "0" + i : i;
                    sort = i + sortIndex;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + num + "'>");
                    htmlData.push("<span class='name'><i class='HKNo_" + i + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>特碼</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 4; n++) {
                for (var i = n; i <= 16; i = i + 4) {
                    sort = i + 49;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 3) {
            htmlData.push("<div class='game_box gameBox col_3 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>特肖</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 4; n++) {
                for (var i = n; i <= 12; i = i + 4) {
                    sort = i + 141;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box gameBox col_3 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>色波</legend>");
            htmlData.push("<ul>");
            for (var i = 115; i <= 133; i = i + 9) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box gameBox col_3 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>半波</legend>");
            htmlData.push("<ul>");
            for (var i = 116; i <= 134; i = i + 9) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            for (var i = 117; i <= 135; i = i + 9) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            for (var i = 118; i <= 136; i = i + 9) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            for (var i = 119; i <= 137; i = i + 9) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box gameBox col_3 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>半半波</legend>");
            htmlData.push("<ul>");
            for (var i = 120; i <= 138; i = i + 9) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            for (var i = 121; i <= 139; i = i + 9) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            for (var i = 122; i <= 140; i = i + 9) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            for (var i = 123; i <= 141; i = i + 9) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>頭數</legend>");
            htmlData.push("<ul>");
            for (var i = 155; i <= 159; i++) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>尾數</legend>");
            htmlData.push("<ul>");
            for (var i = 160; i <= 169; i++) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>五行</legend>");
            htmlData.push("<ul>");
            for (var i = 741; i <= 745; i++) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 4) {
            htmlData.push("<div class='game_lm_title kc_lm_title'>");
            htmlData.push("<ul id='gameTitle' class='base-clear'>");
            htmlData.push("<li class='' data-mysort='679' data-dow='2' data-min='2' data-max='2'><h3>2肖</h3><h4>" + oddsList[679] + "</h4></li>");
            htmlData.push("<li class='' data-mysort='678' data-dow='3' data-min='3' data-max='3'><h3>3肖</h3><h4>" + oddsList[678] + "</h4></li>");
            htmlData.push("<li class='' data-mysort='677' data-dow='4' data-min='4' data-max='4'><h3>4肖</h3><h4>" + oddsList[677] + "</h4></li>");
            htmlData.push("<li class='' data-mysort='676' data-dow='5' data-min='5' data-max='5'><h3>5肖</h3><h4>" + oddsList[676] + "</h4></li>");
            htmlData.push("<li class='active' data-mysort='154' data-dow='6' data-min='6' data-max='6'><h3>6肖</h3><h4>" + oddsList[154] + "</h4></li>");
            htmlData.push("</ul>");
            htmlData.push("</div>"); //game_lm_title end

            htmlData.push("<div class='game_box gameBox col_3 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>合肖</legend>");
            htmlData.push("<ul>");
            var radiodsable = G.DecimalSign(oddsList[154]) ? "" : "radiodsable";
            for (var n = 1; n <= 4; n++) {
                for (var i = n; i <= 12; i = i + 4) {
                    sort = i + 675;
                    htmlData.push("<li data-sort='" + i + "' data-name='" + _num2(i + 141) + "'>");
                    htmlData.push("<span class='name'>" + _num2(i + 141) + "</span>");
                    htmlData.push("<span class='p'><a class='red'>" + oddsList[154] + "</a></span>");
                    htmlData.push("<span class='in'><a href='javascript:;' class='radioSim " + radiodsable + "'></a></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type >= 5 && type <= 10) {
            knResult();
            if (type == 5) {
                str = "正一";
                sortIndex = 222;
                data_type[0] = "active";
            } else if (type == 6) {
                str = "正二";
                sortIndex = 280;
                data_type[1] = "active";
            } else if (type == 7) {
                str = "正三";
                sortIndex = 338;
                data_type[2] = "active";
            } else if (type == 8) {
                str = "正四";
                sortIndex = 396;
                data_type[3] = "active";
            } else if (type == 9) {
                str = "正五";
                sortIndex = 454;
                data_type[4] = "active";
            } else if (type == 10) {
                str = "正六";
                sortIndex = 512;
                data_type[5] = "active";
            }

            htmlData.push("<div class='game_lm_title kc_lm_title'>");
            htmlData.push("<ul id='gameTitle' class='base-clear'>");
            htmlData.push("<li class='" + data_type[0] + "' data-action='gamedata&gameIndex=1&type=5'><h3>正1特</h3></li>");
            htmlData.push("<li class='" + data_type[1] + "' data-action='gamedata&gameIndex=1&type=6'><h3>正2特</h3></li>");
            htmlData.push("<li class='" + data_type[2] + "' data-action='gamedata&gameIndex=1&type=7'><h3>正3特</h3></li>");
            htmlData.push("<li class='" + data_type[3] + "' data-action='gamedata&gameIndex=1&type=8'><h3>正4特</h3></li>");
            htmlData.push("<li class='" + data_type[4] + "' data-action='gamedata&gameIndex=1&type=9'><h3>正5特</h3></li>");
            htmlData.push("<li class='" + data_type[5] + "' data-action='gamedata&gameIndex=1&type=10'><h3>正6特</h3></li>");
            htmlData.push("</ul>");
            htmlData.push("</div>"); //game_lm_title end

            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>" + str + "特</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 10; n++) {
                for (var i = n; i <= 49; i = i + 10) {
                    num = i < 10 ? "0" + i : i;
                    sort = i + sortIndex;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + num + "'>");
                    htmlData.push("<span class='name'><i class='HKNo_" + i + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>" + str + "</legend>");
            htmlData.push("<ul>");
            sort = 56 + sortIndex;
            disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
            sort = 50 + sortIndex;
            disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
            sort = 52 + sortIndex;
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
            sort = 54 + sortIndex;
            disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
            sort = 57 + sortIndex;
            disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
            sort = 51 + sortIndex;
            disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
            sort = 53 + sortIndex;
            disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
            sort = 55 + sortIndex;
            disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
            sort = 58 + sortIndex;
            disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 11) {
            var s, e;
            for (var i = 1; i <= 6; i++) {
                if (i == 1) {
                    s = 272;
                    e = 280;
                    str = "一";
                } else if (i == 2) {
                    s = 330;
                    e = 338;
                    str = "二";
                } else if (i == 3) {
                    s = 388;
                    e = 396;
                    str = "三";
                } else if (i == 4) {
                    s = 446;
                    e = 454;
                    str = "四";
                } else if (i == 5) {
                    s = 504;
                    e = 512;
                    str = "五";
                } else if (i == 6) {
                    s = 562;
                    e = 570;
                    str = "六";
                }
                htmlData.push("<div class='game_box gameBox col_33 base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>正" + str + "</legend>");
                htmlData.push("<ul>");
                for (var n = s; n <= e; n++) {
                    sort = n;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type == 12 || type == 13) {
            knResult(); //創建快捷下註模塊
            if (type == 12) {
                str = "正碼A";
                sortIndex = 169;
                data_type[0] = "active";
                data_type[1] = "";
            } else if (type == 13) {
                str = "正碼B";
                sortIndex = 1137;
                data_type[0] = "";
                data_type[1] = "active";
            }

            htmlData.push("<div class='game_lm_title kc_lm_title'>");
            htmlData.push("<ul id='gameTitle' class='base-clear'>");
            htmlData.push("<li class='" + data_type[0] + "' data-action='gamedata&gameIndex=1&type=12'><h3>正碼A</h3></li>");
            htmlData.push("<li class='" + data_type[1] + "' data-action='gamedata&gameIndex=1&type=13'><h3>正碼B</h3></li>");
            htmlData.push("</ul>");
            htmlData.push("</div>"); //game_lm_title end

            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>" + str + "</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 10; n++) {
                for (var i = n; i <= 49; i = i + 10) {
                    num = i < 10 ? "0" + i : i;
                    sort = i + sortIndex;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + num + "'>");
                    htmlData.push("<span class='name'><i class='HKNo_" + i + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>總和</legend>");
            htmlData.push("<ul>");
            for (var i = 219; i <= 222; i++) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 14) {
            htmlData.push("<div class='game_box gameBox col_3 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>平特一肖</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 4; n++) {
                for (var i = n; i <= 12; i = i + 4) {
                    sort = i + 570;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>平特尾數</legend>");
            htmlData.push("<ul>");
            for (var i = 583; i <= 592; i++) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 15) {
            htmlData.push("<div class='game_box gameBox col_3 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>正肖</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 4; n++) {
                for (var i = n; i <= 12; i = i + 4) {
                    sort = i + 592;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>總肖</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 2; n++) {
                for (var i = n; i <= 8; i = i + 2) { //740
                    sort = i + 732;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>七色波</legend>");
            htmlData.push("<ul>");
            for (var i = 605; i <= 608; i++) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type >= 16 && type <= 21) {
            var radiodsable;
            knResult(); //创建快捷下注模块
            if (type == 16) {
                str = "五不中";
                sortIndex = 683;
                data_type[0] = "active";
            } else if (type == 17) {
                str = "六不中";
                sortIndex = 1198;
                data_type[1] = "active";
            } else if (type == 18) {
                str = "七不中";
                sortIndex = 1247;
                data_type[2] = "active";
            } else if (type == 19) {
                str = "八不中";
                sortIndex = 1296;
                data_type[3] = "active";
            } else if (type == 20) {
                str = "九不中";
                sortIndex = 1345;
                data_type[4] = "active";
            } else if (type == 21) {
                str = "十不中";
                sortIndex = 1394;
                data_type[5] = "active";
            }
            htmlData.push("<div class='game_lm_title kc_lm_title'>");
            htmlData.push("<ul id='gameTitle' class='base-clear'>");
            htmlData.push("<li class='" + data_type[0] + "' data-mysort='684' data-min='5' data-max='10' data-action='gamedata&gameIndex=1&type=16'><h3>五不中</h3></li>");
            htmlData.push("<li class='" + data_type[1] + "' data-mysort='1199' data-min='6' data-max='10' data-action='gamedata&gameIndex=1&type=17'><h3>六不中</h3></li>");
            htmlData.push("<li class='" + data_type[2] + "' data-mysort='1248' data-min='7' data-max='10' data-action='gamedata&gameIndex=1&type=18'><h3>七不中</h3></li>");
            htmlData.push("<li class='" + data_type[3] + "' data-mysort='1297' data-min='8' data-max='10' data-action='gamedata&gameIndex=1&type=19'><h3>八不中</h3></li>");
            htmlData.push("<li class='" + data_type[4] + "' data-mysort='1346' data-min='9' data-max='10' data-action='gamedata&gameIndex=1&type=20'><h3>九不中</h3></li>");
            htmlData.push("<li class='" + data_type[5] + "' data-mysort='1395' data-min='10' data-max='10' data-action='gamedata&gameIndex=1&type=21'><h3>十不中</h3></li>");
            htmlData.push("</ul>");
            htmlData.push("</div>"); //game_lm_title end

            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>" + str + "</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 10; n++) {
                for (var i = n; i <= 49; i = i + 10) {
                    num = i < 10 ? "0" + i : i;
                    sort = i + sortIndex;
                    radiodsable = G.DecimalSign(oddsList[sort]) ? "" : "radiodsable";
                    htmlData.push("<li data-sort='" + sort + "' data-name='" + num + "'>");
                    htmlData.push("<span class='name'><i class='HKNo_" + i + "'></i></span>");
                    htmlData.push("<span class='p'><a class='red'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><a href='javascript:;' class='radioSim " + radiodsable + "'></a></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type >= 22 && type <= 28) {
            var radiodsable;
            if (type == 22) {
                str = "二連肖";
                sortIndex = 609;
                data_type[0] = "active";
            } else if (type == 23) {
                str = "三連肖";
                sortIndex = 621;
                data_type[1] = "active";
            } else if (type == 24) {
                str = "四連肖";
                sortIndex = 633;
                data_type[2] = "active";
            } else if (type == 25) {
                str = "五連肖";
                sortIndex = 1186;
                data_type[3] = "active";
            } else if (type == 26) {
                str = "二連尾";
                sortIndex = 645;
                data_type[4] = "active";
            } else if (type == 27) {
                str = "三連尾";
                sortIndex = 655;
                data_type[5] = "active";
            } else if (type == 28) {
                str = "四連尾";
                sortIndex = 665;
                data_type[6] = "active";
            }
            htmlData.push("<div class='game_lm_title kc_lm_title'>");
            htmlData.push("<ul id='gameTitle' class='base-clear'>");
            htmlData.push("<li class='" + data_type[0] + "' data-mysort='610' data-min='2' data-max='10' data-action='gamedata&gameIndex=1&type=22'><h3>二連肖</h3></li>");
            htmlData.push("<li class='" + data_type[1] + "' data-mysort='622' data-min='3' data-max='10' data-action='gamedata&gameIndex=1&type=23'><h3>三連肖</h3></li>");
            htmlData.push("<li class='" + data_type[2] + "' data-mysort='634' data-min='4' data-max='10' data-action='gamedata&gameIndex=1&type=24'><h3>四連肖</h3></li>");
            htmlData.push("<li class='" + data_type[3] + "' data-mysort='1187' data-min='5' data-max='10' data-action='gamedata&gameIndex=1&type=25'><h3>五連肖</h3></li>");
            htmlData.push("<li class='" + data_type[4] + "' data-mysort='646' data-min='2' data-max='8' data-action='gamedata&gameIndex=1&type=26'><h3>二連尾</h3></li>");
            htmlData.push("<li class='" + data_type[5] + "' data-mysort='656' data-min='3' data-max='8' data-action='gamedata&gameIndex=1&type=27'><h3>三連尾</h3></li>");
            htmlData.push("<li class='" + data_type[6] + "' data-mysort='666' data-min='4' data-max='8' data-action='gamedata&gameIndex=1&type=28'><h3>四連尾</h3></li>");
            htmlData.push("</ul>");
            htmlData.push("</div>"); //game_lm_title end

            if (type >= 22 && type <= 25) {
                htmlData.push("<div class='game_box gameBox col_3 base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + str + "</legend>");
                htmlData.push("<ul>");
                for (var n = 1; n <= 4; n++) {
                    for (var i = n; i <= 12; i = i + 4) {
                        sort = i + sortIndex;
                        radiodsable = G.DecimalSign(oddsList[sort]) ? "" : "radiodsable";
                        htmlData.push("<li data-sort='" + sort + "' data-name='" + _num2(sort) + "'>");
                        htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                        htmlData.push("<span class='p'><a class='red'>" + oddsList[sort] + "</a></span>");
                        htmlData.push("<span class='in'><a href='javascript:;' class='radioSim " + radiodsable + "'></a></span>");
                        htmlData.push("</li>");
                    }
                }

                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            } else {
                htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + str + "</legend>");
                htmlData.push("<ul>");
                for (var n = 1; n <= 2; n++) {
                    for (var i = n; i <= 10; i = i + 2) {
                        sort = i + sortIndex;
                        radiodsable = G.DecimalSign(oddsList[sort]) ? "" : "radiodsable";
                        htmlData.push("<li data-sort='" + sort + "' data-name='" + _num2(sort) + "'>");
                        htmlData.push("<span class='name'>" + _num2(sort) + "尾</span>");
                        htmlData.push("<span class='p'><a class='red'>" + oddsList[sort] + "</a></span>");
                        htmlData.push("<span class='in'><a href='javascript:;' class='radioSim " + radiodsable + "'></a></span>");
                        htmlData.push("</li>");
                    }
                }

                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type >= 29 && type <= 34) {
            var radiodsable;
            knResult(); //创建快捷下注模块
            if (type == 29) {
                str = "二全中";
                sortIndex = 745;
                data_type[0] = "active";
            } else if (type == 30) {
                str = "三全中";
                sortIndex = 794;
                data_type[1] = "active";
            } else if (type == 31) {
                str = "三中二";
                sortIndex = 843;
                data_type[2] = "active";
            } else if (type == 32) {
                str = "二中特";
                sortIndex = 941;
                data_type[3] = "active";
            } else if (type == 33) {
                str = "特串";
                sortIndex = 1039;
                data_type[4] = "active";
            } else if (type == 34) {
                str = "四全中";
                sortIndex = 1088;
                data_type[5] = "active";
            }
            htmlData.push("<div class='game_lm_title kc_lm_title'>");
            htmlData.push("<ul id='gameTitle' class='base-clear'>");
            htmlData.push("<li class='" + data_type[0] + "' data-mysort='746' data-min='2' data-max='10' data-action='gamedata&gameIndex=1&type=29'><h3>二全中</h3></li>");
            htmlData.push("<li class='" + data_type[1] + "' data-mysort='795' data-min='3' data-max='10' data-action='gamedata&gameIndex=1&type=30'><h3>三全中</h3></li>");
            htmlData.push("<li class='" + data_type[2] + "' data-mysort='844' data-min='3' data-max='10' data-action='gamedata&gameIndex=1&type=31'><h3>三中二</h3></li>");
            htmlData.push("<li class='" + data_type[3] + "' data-mysort='942' data-min='2' data-max='10' data-action='gamedata&gameIndex=1&type=32'><h3>二中特</h3></li>");
            htmlData.push("<li class='" + data_type[4] + "' data-mysort='1040' data-min='2' data-max='10' data-action='gamedata&gameIndex=1&type=33'><h3>特串</h3></li>");
            htmlData.push("<li class='" + data_type[5] + "' data-mysort='1089' data-min='4' data-max='10' data-action='gamedata&gameIndex=1&type=34'><h3>四全中</h3></li>");
            htmlData.push("</ul>");
            htmlData.push("</div>"); //game_lm_title end

            if (type == 29 || type == 30 || type == 33 || type == 34) {
                htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + str + "</legend>");
                htmlData.push("<ul>");
                for (var n = 1; n <= 10; n++) {
                    for (var i = n; i <= 49; i = i + 10) {
                        num = i < 10 ? "0" + i : i;
                        sort = i + sortIndex;
                        radiodsable = G.DecimalSign(oddsList[sort]) ? "" : "radiodsable";
                        htmlData.push("<li data-sort='" + sort + "' data-name='" + num + "'>");
                        htmlData.push("<span class='name'><i class='HKNo_" + i + "'></i></span>");
                        htmlData.push("<span class='p'><a class='red'>" + oddsList[sort] + "</a></span>");
                        htmlData.push("<span class='in'><a href='javascript:;' class='radioSim " + radiodsable + "'></a></span>");
                        htmlData.push("</li>");
                    }
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            } else {
                var myodds;
                htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + str + "</legend>");
                htmlData.push("<ul>");
                for (var n = 1; n <= 10; n++) {
                    for (var i = n; i <= 49; i = i + 10) {
                        num = i < 10 ? "0" + i : i;
                        sort = i + sortIndex;
                        radiodsable = G.DecimalSign(oddsList[sort]) ? "" : "radiodsable";
                        myodds = G.DecimalSign(oddsList[sort]) ? oddsList[sort] + "/" + oddsList[sort + 49] : "-";
                        htmlData.push("<li data-sort='" + sort + "' data-name='" + num + "'>");
                        htmlData.push("<span class='name'><i class='HKNo_" + i + "'></i></span>");
                        htmlData.push("<span class='p'><a class='red'>" + myodds + "</a></span>");
                        htmlData.push("<span class='in'><a href='javascript:;' class='radioSim " + radiodsable + "'></a></span>");
                        htmlData.push("</li>");
                    }
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        }
    } else if (gameIndex == 2 || gameIndex == 7) { //KLC
        var myNum = gameIndex == 2 ? "KLC" : "NC";
        if (type == 1) {
            htmlData.push("<div class='game_box gameBox col_3 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>總和</legend>");
            htmlData.push("<ul>");
            for (var i = 1; i <= 2; i++) {
                for (var n = i; n <= 6; n = n + 2) {
                    sort = n + 316;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _klcnum1(sort) + "' data-name='" + _klcnum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _klcnum1(sort) + _klcnum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
            for (var i = 0; i < 8; i++) {
                if (i > 0)
                    sortIndex = i * 37;
                else
                    sortIndex = 0;

                htmlData.push("<div class='game_box base-clear'>");
                htmlData.push("<div class='game_con game_con_s'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>第" + _dx((i + 1)) + "球</legend>");
                htmlData.push("<ul>");
                var dxdsArr = [23, 24, 21, 22, 27, 28, 25, 26];
                for (var n = 0; n < 8; n++) {
                    sort = dxdsArr[n] + sortIndex;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _klcnum1(sort) + "' data-name='" + _klcnum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _klcnum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
                if (i < 4) {
                    for (var n = 36 + sortIndex; n <= 37 + sortIndex; n++) {
                        sort = n;
                        disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                        htmlData.push("<li data-sort='" + sort + "' data-title='" + _klcnum1(sort) + "' data-name='" + _klcnum2(sort) + "'>");
                        htmlData.push("<span class='name'>" + _klcnum2(sort) + "</span>");
                        htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                        htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                        htmlData.push("</li>");
                    }
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type == 2) {
            htmlData.push("<table class='t_d1_8'>");
            htmlData.push("<thead><tr><th>號</th><th>第一球</th><th>第二球</th><th>第三球</th><th>第四球</th><th>第五球</th><th>第六球</th><th>第七球</th><th>第八球</th></tr></thead>");
            htmlData.push("<tbody class='d1_8'>");
            htmlData.push("<tr>");
            htmlData.push("<td width='27'>" + klcToHaoMaPan(1, false, false, myNum) + "</td>");
            htmlData.push("<td class='game_box'>" + klcToHaoMaPan(2, 1, oddsList, myNum) + "</td>");
            htmlData.push("<td class='game_box'>" + klcToHaoMaPan(2, 38, oddsList, myNum) + "</td>");
            htmlData.push("<td class='game_box'>" + klcToHaoMaPan(2, 75, oddsList, myNum) + "</td>");
            htmlData.push("<td class='game_box'>" + klcToHaoMaPan(2, 112, oddsList, myNum) + "</td>");
            htmlData.push("<td class='game_box'>" + klcToHaoMaPan(2, 149, oddsList, myNum) + "</td>");
            htmlData.push("<td class='game_box'>" + klcToHaoMaPan(2, 186, oddsList, myNum) + "</td>");
            htmlData.push("<td class='game_box'>" + klcToHaoMaPan(2, 223, oddsList, myNum) + "</td>");
            htmlData.push("<td class='game_box'>" + klcToHaoMaPan(2, 260, oddsList, myNum) + "</td>");
            htmlData.push("</tr>");
            htmlData.push("</tbody>");
            htmlData.push("</table>");
        } else if (type >= 3 && type <= 10) {
            var box = "", len = 8;
            if (type == 3) {
                str = "一";
                box = "gameBox col_5";
                len = 10;
                sortIndex = 0;
            } else if (type == 4) {
                str = "二";
                box = "gameBox col_5";
                len = 10;
                sortIndex = 37;
            } else if (type == 5) {
                str = "三";
                box = "gameBox col_5";
                len = 10;
                sortIndex = 74;
            } else if (type == 6) {
                str = "四";
                box = "gameBox col_5";
                len = 10;
                sortIndex = 111;
            } else if (type == 7) {
                str = "五";
                sortIndex = 148;
            } else if (type == 8) {
                str = "六";
                sortIndex = 185;
            } else if (type == 9) {
                str = "七";
                sortIndex = 222;
            } else if (type == 10) {
                str = "八";
                sortIndex = 259;
            }

            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>第" + str + "球</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 4; n++) {
                for (var i = n; i <= 20; i = i + 4) {
                    num = i < 10 ? "0" + i : i;
                    sort = i + sortIndex;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _klcnum1(sort) + "' data-name='" + num + "'>");
                    htmlData.push("<span class='name'><i class='" + myNum + "No_" + i + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box " + box + " base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>兩面</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 2; n++) {
                for (var i = n; i <= len; i = i + 2) {
                    sort = i + 20 + sortIndex;
                    sort = i == 9 || i == 10 ? sort + 7 : sort;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _klcnum1(sort) + "' data-name='" + _klcnum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _klcnum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>方位</legend>");
            htmlData.push("<ul>");
            for (var i = 1; i <= 7; i++) {
                sort = i + 28 + sortIndex;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _klcnum1(sort) + "' data-name='" + _klcnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _klcnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }

            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 11) {
            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>正碼</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 4; n++) {
                for (var i = n; i <= 20; i = i + 4) {
                    num = i < 10 ? "0" + i : i;
                    sort = i + 296;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _klcnum1(sort) + "' data-name='" + num + "'>");
                    htmlData.push("<span class='name'><i class='" + myNum + "No_" + i + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box gameBox col_3 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>總和</legend>");
            htmlData.push("<ul>");
            for (var i = 1; i <= 2; i++) {
                for (var n = i; n <= 6; n = n + 2) {
                    sort = n + 316;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _klcnum1(sort) + "' data-name='" + _klcnum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _klcnum1(sort) + _klcnum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 12) {
            var radiodsable = "";
            if (!G.DecimalSign(oddsList[323]) && !G.DecimalSign(oddsList[324]) && !G.DecimalSign(oddsList[325]) && !G.DecimalSign(oddsList[326]) && !G.DecimalSign(oddsList[327]) && !G.DecimalSign(oddsList[328]) && !G.DecimalSign(oddsList[329])) {
                radiodsable = "radiodsable";
            }

            htmlData.push("<div class='game_lm_title kc_lm_title'>");
            htmlData.push("<ul id='gameTitle' class='base-clear'>");
            htmlData.push("<li class='active' data-mysort='323' data-min='2' data-max='8'><h3>任選二</h3><h4>" + oddsList[323] + "</h4></li>");
            htmlData.push("<li class='' data-mysort='324' data-min='2' data-max='8'><h3>選二連直</h3><h4>-</h4></li>");
            htmlData.push("<li class='' data-mysort='325' data-min='2' data-max='8'><h3>選二連組</h3><h4>" + oddsList[325] + "</h4></li>");
            htmlData.push("<li class='' data-mysort='326' data-min='3' data-max='8'><h3>任選三</h3><h4>" + oddsList[326] + "</h4></li>");
            htmlData.push("<li class='' data-mysort='327' data-min='3' data-max='8'><h3>選三前組</h3><h4>" + oddsList[327] + "</h4></li>");
            htmlData.push("<li class='' data-mysort='328' data-min='4' data-max='8'><h3>任選四</h3><h4>" + oddsList[328] + "</h4></li>");
            htmlData.push("<li class='' data-mysort='329' data-min='5' data-max='8'><h3>任選五</h3><h4>" + oddsList[329] + "</h4></li>");
            htmlData.push("</ul>");
            htmlData.push("</div>"); //game_lm_title end

            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>任選二</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 4; n++) {
                for (var i = n; i <= 20; i = i + 4) {
                    num = i < 10 ? "0" + i : i;
                    sort = i + 322;
                    htmlData.push("<li data-sort='" + i + "' data-title='" + _klcnum1(sort) + "' data-name='" + num + "'>");
                    htmlData.push("<span class='name'><i class='" + myNum + "No_" + i + "'></i></span>");
                    htmlData.push("<span class='in'><a href='javascript:;' class='radioSim " + radiodsable + "'></a></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        }
    } else if (gameIndex == 3 || gameIndex == 15) { //SSC
        if (type == 1) {
            for (var i = 0; i < 5; i++) {
                if (i > 0)
                    sortIndex = i * 14;
                else
                    sortIndex = 0;
                htmlData.push("<div class='game_box col_1 gameBox base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>第" + _dx((i + 1)) + "球</legend>");
                htmlData.push("<ul>");
                var dxds = [13,14,11,12];
                for (var nn = 0; nn < 4; nn++) {
                    var n = dxds[nn];
                    sort = n + sortIndex;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _sscnum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }

            //htmlData.push("<div class='game_box base-clear'>");
            //htmlData.push("<div class='game_con'>");
            //htmlData.push("<fieldset>");
            //htmlData.push("<legend>牛牛兩面</legend>");
            //htmlData.push("<ul>");
            //for (var i = 104; i <= 107; i++) {
            //    sort = i;
            //    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            //    htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
            //    htmlData.push("<span class='name'>" + _sscnum1(sort) + _sscnum2(sort) + "</span>");
            //    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            //    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            //    htmlData.push("</li>");
            //}
            //htmlData.push("</ul>");
            //htmlData.push("</fieldset>");
            //htmlData.push("</div>");
            //htmlData.push("</div>");

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>總和、龍虎和</legend>");
            htmlData.push("<ul>");
            for (var i = 71; i <= 77; i++) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _sscnum1(sort) + _sscnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 2) {
            for (var i = 0; i < 5; i++) {
                if (i > 0)
                    sortIndex = i * 14;
                else
                    sortIndex = 0;
                htmlData.push("<div class='game_box col_1 gameBox base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>第" + _dx((i + 1)) + "球</legend>");
                htmlData.push("<ul>");
                for (var n = 1; n <= 10; n++) {
                    sort = n + sortIndex;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
                    htmlData.push("<span class='name'><i class='SSCNo_" + (n - 1) + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type >= 3 && type <= 7) {
            var box = "", len = 8;
            if (type == 3) {
                str = "一";
                len = 10;
                sortIndex = 0;
            } else if (type == 4) {
                str = "二";
                len = 10;
                sortIndex = 14;
            } else if (type == 5) {
                str = "三";
                len = 10;
                sortIndex = 28;
            } else if (type == 6) {
                str = "四";
                len = 10;
                sortIndex = 42;
            } else if (type == 7) {
                str = "五";
                sortIndex = 56;
            }

            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>第" + str + "球</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 2; n++) {
                for (var i = n; i <= 10; i = i + 2) {
                    num = i - 1;
                    sort = i + sortIndex;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + num + "'>");
                    htmlData.push("<span class='name'><i class='SSCNo_" + num + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>單雙大小</legend>");
            htmlData.push("<ul>");
            var dxds = [13, 14, 11, 12];
            for (var ii = 0; ii < 4; ii++) {
                var i = dxds[ii];
                sort = i + sortIndex;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _sscnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>總和、龍虎和</legend>");
            htmlData.push("<ul>");
            for (var i = 71; i <= 77; i++) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _sscnum1(sort) + _sscnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box col_33 gameBox base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>前三</legend>");
            htmlData.push("<ul>");
            for (var i = 78; i <= 82; i++) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _sscnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box col_33 gameBox base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>中三</legend>");
            htmlData.push("<ul>");
            for (var i = 83; i <= 87; i++) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _sscnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box col_33 gameBox base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>后三</legend>");
            htmlData.push("<ul>");
            for (var i = 88; i <= 92; i++) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _sscnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 8) {
            //htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            //htmlData.push("<div class='game_con'>");
            //htmlData.push("<fieldset>");
            //htmlData.push("<legend>牛牛</legend>");
            //htmlData.push("<ul>");
            //for (var i = 93; i <= 103; i++) {
            //    sort = i;
            //    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            //    htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
            //    htmlData.push("<span class='name'>" + _sscnum2(sort) + "</span>");
            //    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            //    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            //    htmlData.push("</li>");
            //}
            //htmlData.push("</ul>");
            //htmlData.push("</fieldset>");
            //htmlData.push("</div>");
            //htmlData.push("</div>");


            //htmlData.push("<div class='game_box base-clear'>");
            //htmlData.push("<div class='game_con'>");
            //htmlData.push("<fieldset>");
            //htmlData.push("<legend>牛牛兩面</legend>");
            //htmlData.push("<ul>");
            //for (var i = 104; i <= 107; i++) {
            //    sort = i;
            //    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            //    htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
            //    htmlData.push("<span class='name'>" + _sscnum1(sort) + _sscnum2(sort) + "</span>");
            //    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            //    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            //    htmlData.push("</li>");
            //}
            //htmlData.push("</ul>");
            //htmlData.push("</fieldset>");
            //htmlData.push("</div>");
            //htmlData.push("</div>");

        }
    } else if (gameIndex == 4 || gameIndex == 8) { //PK10
        var _dpk = function (index) { switch (index) { case 1: return "冠軍"; case 2: return "亞軍"; case 3: return "第三名"; case 4: return "第四名"; case 5: return "第五名"; case 6: return "第六名"; case 7: return "第七名"; case 8: return "第八名"; case 9: return "第九名"; case 10: return "第十名"; } };
        if (type == 1) {
            var len;
            for (var i = 0; i < 10; i++) {
                if (i > 0)
                    sortIndex = i * 16;
                else
                    sortIndex = 0;
                len = i < 5 ? 37 : 35;
                htmlData.push("<div class='game_box col_1 gameBox base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + _dpk((i + 1)) + "</legend>");
                htmlData.push("<ul>");
                for (var n = 32; n <= len; n++) {
                    sort = n + sortIndex;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _pknum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>冠、亞軍和</legend>");
            htmlData.push("<ul>");
            for (var n = 18; n <= 21; n++) {
                sort = n;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _pknum1(sort) + _pknum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 2) {
            for (var i = 0; i < 10; i++) {
                if (i > 0)
                    sortIndex = i * 16;
                else
                    sortIndex = 0;
                htmlData.push("<div class='game_box col_1 gameBox base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + _dpk((i + 1)) + "</legend>");
                htmlData.push("<ul>");
                for (var n = 22; n <= 31; n++) {
                    sort = n + sortIndex;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                    htmlData.push("<span class='name'><i class='PKNo_" + (n - 21) + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type == 3) {
            htmlData.push("<div class='game_box col_5 gameBox base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>冠、亞軍和</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 17; n++) {
                sort = n;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                htmlData.push("<span class='name bf_14'>" + _pknum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>單雙、大小</legend>");
            htmlData.push("<ul>");
            for (var n = 18; n <= 21; n++) {
                sort = n;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _pknum1(sort) + _pknum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            for (var m = 1; m <= 2; m++) {
                if (m == 2) sortIndex = 16; else sortIndex = 0;
                htmlData.push("<div class='game_box base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + _dpk(m) + "</legend>");
                htmlData.push("<ul>");
                for (var i = 0; i < 4; i++) {
                    for (var n = 22; n <= 34; n = n + 4) {
                        sort = n + i;
                        sort = sort == 32 ? 36 : sort == 33 ? 37 : sort == 36 ? 32 : sort == 37 ? 33 : sort;
                        sort = sort + sortIndex;
                        disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                        str = _pknum2(sort);
                        if (G.DecimalSign(str))
                            str = "<i class='PKNo_" + str + "'></i>";
                        htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                        htmlData.push("<span class='name'>" + str + "</span>");
                        htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                        htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                        htmlData.push("</li>");
                    }
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type == 4) {
            for (var m = 0; m < 4; m++) {
                if (m > 0) sortIndex = m * 16; else sortIndex = 0;
                htmlData.push("<div class='game_box base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + _dpk(m + 3) + "</legend>");
                htmlData.push("<ul>");
                for (var i = 0; i < 4; i++) {
                    for (var n = 54; n <= 69; n = n + 4) {
                        sort = n + i;
                        sort = sort == 64 ? 68 : sort == 65 ? 69 : sort == 68 ? 64 : sort == 69 ? 65 : sort;
                        sort = sort + sortIndex;
                        disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                        str = _pknum2(sort);
                        if (G.DecimalSign(str))
                            str = "<i class='PKNo_" + str + "'></i>";
                        if (str == "-1") {
                            htmlData.push("<li>");
                            htmlData.push("<span class='name'></span>");
                            htmlData.push("<span class='p'></span>");
                            htmlData.push("<span class='in'></span>");
                            htmlData.push("</li>");
                        } else {
                            htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                            htmlData.push("<span class='name'>" + str + "</span>");
                            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                            htmlData.push("</li>");
                        }
                    }
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type == 5) {
            for (var m = 0; m < 4; m++) {
                if (m > 0) sortIndex = m * 16; else sortIndex = 0;
                htmlData.push("<div class='game_box base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + _dpk(m + 7) + "</legend>");
                htmlData.push("<ul>");
                for (var i = 0; i < 4; i++) {
                    for (var n = 118; n <= 133; n = n + 4) {
                        sort = n + i;
                        sort = sort == 128 ? 132 : sort == 129 ? 133 : sort == 132 ? 128 : sort == 133 ? 129 : sort;
                        sort = sort + sortIndex;
                        disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                        str = _pknum2(sort);
                        if (G.DecimalSign(str))
                            str = "<i class='PKNo_" + str + "'></i>";
                        if (str == "-1") {
                            htmlData.push("<li>");
                            htmlData.push("<span class='name'></span>");
                            htmlData.push("<span class='p'></span>");
                            htmlData.push("<span class='in'></span>");
                            htmlData.push("</li>");
                        } else {
                            htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                            htmlData.push("<span class='name'>" + str + "</span>");
                            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                            htmlData.push("</li>");
                        }
                    }
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        }
    } else if (gameIndex == 14) { //PKJS
        var _dpk = function (index) { switch (index) { case 1: return "冠軍"; case 2: return "亞軍"; case 3: return "第三名"; case 4: return "第四名"; case 5: return "第五名"; case 6: return "第六名"; case 7: return "第七名"; case 8: return "第八名"; case 9: return "第九名"; case 10: return "第十名"; } };
        if (type == 1) {
            var len;
            for (var i = 0; i < 10; i++) {
                if (i > 0)
                    sortIndex = i * 16;
                else
                    sortIndex = 0;
                len = i < 5 ? 37 : 35;
                htmlData.push("<div class='game_box col_1 gameBox base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + _dpk((i + 1)) + "</legend>");
                htmlData.push("<ul>");
                for (var n = 32; n <= len; n++) {
                    sort = n + sortIndex;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _pknum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>冠、亞軍和</legend>");
            htmlData.push("<ul>");
            for (var n = 18; n <= 21; n++) {
                sort = n;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _pknum1(sort) + _pknum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 2) {
            for (var i = 0; i < 10; i++) {
                if (i > 0)
                    sortIndex = i * 16;
                else
                    sortIndex = 0;
                htmlData.push("<div class='game_box col_1 gameBox base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + _dpk((i + 1)) + "</legend>");
                htmlData.push("<ul>");
                for (var n = 22; n <= 31; n++) {
                    sort = n + sortIndex;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                    htmlData.push("<span class='name'><i class='PKNo_" + (n - 21) + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type == 3) {
            htmlData.push("<div class='game_box col_5 gameBox base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>冠、亞軍和</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 17; n++) {
                sort = n;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                htmlData.push("<span class='name bf_14'>" + _pknum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>單雙、大小</legend>");
            htmlData.push("<ul>");
            for (var n = 18; n <= 21; n++) {
                sort = n;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _pknum1(sort) + _pknum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            for (var m = 1; m <= 2; m++) {
                if (m == 2) sortIndex = 16; else sortIndex = 0;
                htmlData.push("<div class='game_box base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + _dpk(m) + "</legend>");
                htmlData.push("<ul>");
                for (var i = 0; i < 4; i++) {
                    for (var n = 22; n <= 34; n = n + 4) {
                        sort = n + i;
                        sort = sort == 32 ? 36 : sort == 33 ? 37 : sort == 36 ? 32 : sort == 37 ? 33 : sort;
                        sort = sort + sortIndex;
                        disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                        str = _pknum2(sort);
                        if (G.DecimalSign(str))
                            str = "<i class='PKNo_" + str + "'></i>";
                        htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                        htmlData.push("<span class='name'>" + str + "</span>");
                        htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                        htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                        htmlData.push("</li>");
                    }
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type == 4) {
            for (var m = 0; m < 4; m++) {
                if (m > 0) sortIndex = m * 16; else sortIndex = 0;
                htmlData.push("<div class='game_box base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + _dpk(m + 3) + "</legend>");
                htmlData.push("<ul>");
                for (var i = 0; i < 4; i++) {
                    for (var n = 54; n <= 69; n = n + 4) {
                        sort = n + i;
                        sort = sort == 64 ? 68 : sort == 65 ? 69 : sort == 68 ? 64 : sort == 69 ? 65 : sort;
                        sort = sort + sortIndex;
                        disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                        str = _pknum2(sort);
                        if (G.DecimalSign(str))
                            str = "<i class='PKNo_" + str + "'></i>";
                        if (str == "-1") {
                            htmlData.push("<li>");
                            htmlData.push("<span class='name'></span>");
                            htmlData.push("<span class='p'></span>");
                            htmlData.push("<span class='in'></span>");
                            htmlData.push("</li>");
                        } else {
                            htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                            htmlData.push("<span class='name'>" + str + "</span>");
                            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                            htmlData.push("</li>");
                        }
                    }
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type == 5) {
            for (var m = 0; m < 4; m++) {
                if (m > 0) sortIndex = m * 16; else sortIndex = 0;
                htmlData.push("<div class='game_box base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + _dpk(m + 7) + "</legend>");
                htmlData.push("<ul>");
                for (var i = 0; i < 4; i++) {
                    for (var n = 118; n <= 133; n = n + 4) {
                        sort = n + i;
                        sort = sort == 128 ? 132 : sort == 129 ? 133 : sort == 132 ? 128 : sort == 133 ? 129 : sort;
                        sort = sort + sortIndex;
                        disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                        str = _pknum2(sort);
                        if (G.DecimalSign(str))
                            str = "<i class='PKNo_" + str + "'></i>";
                        if (str == "-1") {
                            htmlData.push("<li>");
                            htmlData.push("<span class='name'></span>");
                            htmlData.push("<span class='p'></span>");
                            htmlData.push("<span class='in'></span>");
                            htmlData.push("</li>");
                        } else {
                            htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                            htmlData.push("<span class='name'>" + str + "</span>");
                            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                            htmlData.push("</li>");
                        }
                    }
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        }
    } else if (gameIndex == 5) { //KS
        $(".rightBox div.left li").removeClass("active");
        $(".rightBox div.right ul").removeClass("active");
        $(".rightBox div.left li[name='lmResult']").css("display", "none");
        $(".rightBox div.left li[name='putResult']").addClass("active");
        $(".rightBox div.right #putResult").addClass("active");
        var bf_14;
        var _subNum = function (str) {
            var timeAry = [];
            for (var n = 0; n < str.length; n++) {
                timeAry.push("<i class='KSNo_" + str.substring(n, n + 1) + "'></i>");
            }
            return timeAry.join("");
        };
        htmlData.push("<div class='game_box base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>三軍、大小</legend>");
        htmlData.push("<ul>");
        for (var i = 3; i <= 10; i++) {
            sort = i;
            sort = sort == 9 ? 1 : sort == 10 ? 2 : sort;
            sort = sort == 6 ? 1 : sort == 1 ? 6 : sort;
            sort = sort == 7 ? 8 : sort == 8 ? 7 : sort;
            sort = sort == 8 ? 6 : sort == 6 ? 8 : sort;
            disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            str = _ksnum2(sort);
            if (G.DecimalSign(str)) str = "<i class='KSNo_" + str + "'></i>";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _ksnum1(sort) + "' data-name='" + _ksnum2(sort) + "'>");
            htmlData.push("<span class='name'>" + str + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box col_3_3 gameBox base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>圍骰、全骰</legend>");
        htmlData.push("<ul>");
        for (var i = 9; i <= 15; i++) {
            sort = i;
            disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            bf_14 = "";
            str = _ksnum2(sort);
            if (G.DecimalSign(str)) { str = _subNum(str); bf_14 = "bf_14"; }
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _ksnum1(sort) + "' data-name='" + _ksnum2(sort) + "'>");
            htmlData.push("<span class='name " + bf_14 + "'>" + str + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box col_5 gameBox base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>點數</legend>");
        htmlData.push("<ul>");
        for (var n = 1; n < 4; n++) {
            for (var i = n; i <= 14; i = i + 3) {
                sort = i + 15;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _ksnum1(sort) + "' data-name='" + _ksnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _ksnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box col_3_3 gameBox base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>長牌</legend>");
        htmlData.push("<ul class='k3_2'>");
        for (var n = 1; n < 6; n++) {
            for (var i = n; i <= 15; i = i + 5) {
                sort = i + 29;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _ksnum1(sort) + "' data-name='" + _ksnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _subNum(_ksnum2(sort)) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box col_3_3 gameBox base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>短牌</legend>");
        htmlData.push("<ul class='k3_2'>");
        for (var i = 45; i <= 50; i++) {
            sort = i;
            disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _ksnum1(sort) + "' data-name='" + _ksnum2(sort) + "'>");
            htmlData.push("<span class='name'>" + _subNum(_ksnum2(sort)) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

    } else if (gameIndex == 6) { //KLB
        if (type == 1) {
            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>總和、總和過關</legend>");
            htmlData.push("<ul>");
            for (var i = 81; i <= 84; i++) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _klbnum1(sort) + "' data-name='" + _klbnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _klbnum1(sort) + _klbnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            for (var i = 86; i <= 89; i++) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _klbnum1(sort) + "' data-name='" + _klbnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _klbnum1(sort) + _klbnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            sort = 85;
            disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _klbnum1(sort) + "' data-name='" + _klbnum2(sort) + "'>");
            htmlData.push("<span class='name'>" + _klbnum1(sort) + _klbnum2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box col_3 gameBox base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>前后和</legend>");
            htmlData.push("<ul>");
            for (var i = 90; i <= 92; i++) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _klbnum1(sort) + "' data-name='" + _klbnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _klbnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }

            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box col_3 gameBox base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>單雙和</legend>");
            htmlData.push("<ul>");
            for (var i = 93; i <= 95; i++) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _klbnum1(sort) + "' data-name='" + _klbnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _klbnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }

            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box col_5 gameBox base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>五行</legend>");
            htmlData.push("<ul>");
            for (var i = 96; i <= 100; i++) {
                sort = i;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _klbnum1(sort) + "' data-name='" + _klbnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _klbnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }

            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 2) {
            htmlData.push("<div class='game_box col_5 gameBox base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>正碼</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 16; n++) {
                for (var i = n; i <= 80; i = i + 16) {
                    sort = i;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _klbnum1(sort) + "' data-name='" + _klbnum2(sort) + "'>");
                    htmlData.push("<span class='name'><i class='KLBNo_" + i + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        }
    } else if (gameIndex == 8) {

    } else if (gameIndex == 9) {

    } else if (gameIndex == 10) {
        if (type == 1) {
            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>總和、龍虎</legend>");
            htmlData.push("<ul>");
            for (var i = 1; i <= 2; i++) {
                for (var n = i; n <= 8; n = n + 2) {
                    sort = n + 201;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    str = sort == 208 || sort == 209 ? "" : _gxnum1(sort);
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _gxnum1(sort) + "' data-name='" + _gxnum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + str + _gxnum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
            for (var i = 0; i < 5; i++) {
                if (i > 0)
                    sortIndex = i * 36;
                else
                    sortIndex = 0;

                htmlData.push("<div class='game_box col_1 gameBox base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>第" + _dx((i + 1)) + "球</legend>");
                htmlData.push("<ul>");
                for (var n = 22; n <= 29; n++) {
                    sort = n + sortIndex;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _gxnum1(sort) + "' data-name='" + _gxnum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _gxnum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type == 2) {
            for (var i = 0; i < 5; i++) {
                if (i > 0)
                    sortIndex = i * 36;
                else
                    sortIndex = 0;

                htmlData.push("<div class='game_box col_1 gameBox base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>第" + _dx((i + 1)) + "球</legend>");
                htmlData.push("<ul>");
                for (var n = 1; n <= 21; n++) {
                    sort = n + sortIndex;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _gxnum1(sort) + "' data-name='" + _gxnum2(sort) + "'>");
                    htmlData.push("<span class='name'><i class='GXNo_" + n + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type >= 3 && type <= 7) {
            if (type == 3) {
                str = "一";
                sortIndex = 0;
            } else if (type == 4) {
                str = "二";
                sortIndex = 36;
            } else if (type == 5) {
                str = "三";
                sortIndex = 72;
            } else if (type == 6) {
                str = "四";
                sortIndex = 108;
            } else if (type == 7) {
                str = "五";
                sortIndex = 144;
            }

            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>第" + str + "球</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 4; n++) {
                for (var i = n; i <= 20; i = i + 4) {
                    num = i < 10 ? "0" + i : i;
                    sort = i + sortIndex;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _gxnum1(sort) + "' data-name='" + num + "'>");
                    htmlData.push("<span class='name'><i class='GXNo_" + i + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            sort = 21 + sortIndex;
            disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _gxnum1(sort) + "' data-name='21'>");
            htmlData.push("<span class='name'><i class='GXNo_21'></i></span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>兩面</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 4; n++) {
                for (var i = n; i <= 15; i = i + 4) {
                    sort = i + 21 + sortIndex;
                    //sort = i == 9 || i == 10 ? sort + 7 : sort;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _gxnum1(sort) + "' data-name='" + _gxnum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _gxnum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 8) {
            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>正碼</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 4; n++) {
                for (var i = n; i <= 20; i = i + 4) {
                    num = i < 10 ? "0" + i : i;
                    sort = i + 180;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _gxnum1(sort) + "' data-name='" + num + "'>");
                    htmlData.push("<span class='name'><i class='GXNo_" + i + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            sort = 201;
            disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _gxnum1(sort) + "' data-name='21'>");
            htmlData.push("<span class='name'><i class='GXNo_21'></i></span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 9) {
            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>總和、龍虎</legend>");
            htmlData.push("<ul>");
            for (var i = 1; i <= 2; i++) {
                for (var n = i; n <= 8; n = n + 2) {
                    sort = n + 201;
                    disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    str = sort == 208 || sort == 209 ? "" : _gxnum1(sort);
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _gxnum1(sort) + "' data-name='" + _gxnum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + str + _gxnum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        }
    } else if (gameIndex == 13) {

        $(".rightBox div.left li").removeClass("active");
        $(".rightBox div.right ul").removeClass("active");
        $(".rightBox div.left li[name='lmResult']").css("display", "none");
        $(".rightBox div.left li[name='putResult']").addClass("active");
        $(".rightBox div.right #putResult").addClass("active");
        var bf_14;
        var _subNum = function (str) {
            var timeAry = [];
            for (var n = 0; n < str.length; n++) {
                timeAry.push("<i class='KSNo_" + str.substring(n, n + 1) + "'></i>");
            }
            return timeAry.join("");
        };
        htmlData.push("<div class='game_box base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>三軍、大小</legend>");
        htmlData.push("<ul>");
        for (var i = 3; i <= 10; i++) {
            sort = i;
            sort = sort == 9 ? 1 : sort == 10 ? 2 : sort;
            sort = sort == 6 ? 1 : sort == 1 ? 6 : sort;
            sort = sort == 7 ? 8 : sort == 8 ? 7 : sort;
            sort = sort == 8 ? 6 : sort == 6 ? 8 : sort;
            disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            str = _ksnum2(sort);
            if (G.DecimalSign(str)) str = "<i class='KSNo_" + str + "'></i>";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _ksnum1(sort) + "' data-name='" + _ksnum2(sort) + "'>");
            htmlData.push("<span class='name'>" + str + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box col_3_3 gameBox base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>圍骰、全骰</legend>");
        htmlData.push("<ul>");
        for (var i = 9; i <= 15; i++) {
            sort = i;
            disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            bf_14 = "";
            str = _ksnum2(sort);
            if (G.DecimalSign(str)) { str = _subNum(str); bf_14 = "bf_14"; }
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _ksnum1(sort) + "' data-name='" + _ksnum2(sort) + "'>");
            htmlData.push("<span class='name " + bf_14 + "'>" + str + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box col_5 gameBox base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>點數</legend>");
        htmlData.push("<ul>");
        for (var n = 1; n < 4; n++) {
            for (var i = n; i <= 14; i = i + 3) {
                sort = i + 15;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _ksnum1(sort) + "' data-name='" + _ksnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _ksnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box col_3_3 gameBox base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>長牌</legend>");
        htmlData.push("<ul class='k3_2'>");
        for (var n = 1; n < 6; n++) {
            for (var i = n; i <= 15; i = i + 5) {
                sort = i + 29;
                disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _ksnum1(sort) + "' data-name='" + _ksnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _subNum(_ksnum2(sort)) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box col_3_3 gameBox base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>短牌</legend>");
        htmlData.push("<ul class='k3_2'>");
        for (var i = 45; i <= 50; i++) {
            sort = i;
            disabled = G.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _ksnum1(sort) + "' data-name='" + _ksnum2(sort) + "'>");
            htmlData.push("<span class='name'>" + _subNum(_ksnum2(sort)) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

    }

    htmlData.push("</div>"); //game_ball_wrap end
    game_loading_wrap(false);
    $("#gameBox").html(htmlData.join(""));
    bindGameFun(); //註冊相關函數，單筆下注，多筆下注，重置，提交下注
    gameBoxTitleClick();
    gameTitleClick();
}
function klcToHaoMaPan(str, s_sort, oddsList, myNum) {
    var _oddsList = oddsList || [];
    var _s_sort = s_sort - 1 || 0;
    var disabled;
    var NumAry = ["<ul class='lineHover'>"];
    for (var i = 1; i <= 20; i++) {
        if (str == 1) {
            NumAry.push("<li class='" + myNum + "No_" + i + "'></li>");
        } else if (str == 2) {
            sort = _s_sort + i;
            disabled = G.DecimalSign(_oddsList[sort]) ? "" : "disabled='disabled'";
            NumAry.push("<li data-sort='" + sort + "' data-title='" + _klcnum1(sort) + "' data-name='" + _klcnum2(sort) + "'>");
            NumAry.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + _oddsList[sort] + "</a></span>");
            NumAry.push("<span class='in'><input class='input onlyNum orderInput' " + disabled + " type='text' maxlength='7'></span>");
            NumAry.push("</li>");
        }
    }
    NumAry.push("</ul>");
    return NumAry.join("");
}
function knResult() {
    $(".rightBox div.left").append("<li name='knResult' class='tab_btn'>快<br />捷<br />下<br />註</li>");
    var myknResult = "<ul id='knResult' class='tab_item base-clear'>";
    myknResult += "<li>";
    myknResult += "<table><tbody>";
    myknResult += "<tr><td index='1'>鼠</td><td index='2'>牛</td><td index='3'>虎</td><td index='4'>兔</td><td index='5'>龍</td><td index='6'>蛇</td></tr>";
    myknResult += "<tr><td index='7'>馬</td><td index='8'>羊</td><td index='9'>猴</td><td index='10'>雞</td><td index='11'>狗</td><td index='12'>猪</td></tr>";
    myknResult += "</tbody></table>";
    myknResult += "</li>";
    myknResult += "<li>";
    myknResult += "<table><tbody>";
    myknResult += "<tr><td index='49'>0頭</td><td index='50'>1頭</td><td index='51'>2頭</td><td index='52'>3頭</td><td index='53'>4頭</td></tr>";
    myknResult += "</tbody></table>";
    myknResult += "</li>";
    myknResult += "<li>";
    myknResult += "<table><tbody>";
    myknResult += "<tr><td index='54'>0尾</td><td index='55'>1尾</td><td index='56'>2尾</td><td index='57'>3尾</td><td index='58'>4尾</td></tr>";
    myknResult += "<tr><td index='59'>5尾</td><td index='60'>6尾</td><td index='61'>7尾</td><td index='62'>8尾</td><td index='63'>9尾</td></tr>";
    myknResult += "</tbody></table>";
    myknResult += "</li>";
    myknResult += "<li>";
    myknResult += "<table><tbody>";
    myknResult += "<tr><td index='13' class='red'>紅波</td><td index='22' class='blue'>藍波</td><td index='31' class='green'>綠波</td></tr>";
    myknResult += "</tbody></table>";
    myknResult += "</li>";
    myknResult += "<li>";
    myknResult += "<table><tbody>";
    myknResult += "<tr><td index='14' class='red'>紅單</td><td index='15' class='red'>紅雙</td><td index='16' class='red'>紅大</td><td index='17' class='red'>紅小</td></tr>";
    myknResult += "<tr><td index='23' class='blue'>藍單</td><td index='24' class='blue'>藍雙</td><td index='25' class='blue'>藍大</td><td index='26' class='blue'>藍小</td></tr>";
    myknResult += "<tr><td index='32' class='green'>綠單</td><td index='33' class='green'>綠雙</td><td index='34' class='green'>綠大</td><td index='35' class='green'>綠小</td></tr>";
    myknResult += "</tbody></table>";
    myknResult += "</li>";
    myknResult += "<li>";
    myknResult += "<table><tbody>";
    myknResult += "<tr><td index='18' class='red'>紅大單</td><td index='19' class='red'>紅大雙</td><td index='20' class='red'>紅小單</td><td index='21' class='red'>紅小雙</td></tr>";
    myknResult += "<tr><td index='27' class='blue'>藍大單</td><td index='28' class='blue'>藍大雙</td><td index='29' class='blue'>藍小單</td><td index='30' class='blue'>藍小雙</td></tr>";
    myknResult += "<tr><td index='36' class='green'>綠大單</td><td index='37' class='green'>綠大雙</td><td index='38' class='green'>綠小單</td><td index='39' class='green'>綠小雙</td></tr>";
    myknResult += "</tbody></table>";
    myknResult += "</li>";
    myknResult += "</ul>";
    $(".rightBox div.right").append(myknResult);

    $(".rightBox div.left li").removeClass("active");
    $(".rightBox div.right ul").removeClass("active");
    $(".rightBox div.left li[name='knResult']").addClass("active");
    $(".rightBox div.right #knResult").addClass("active");

    $(".rightBox div.left li").unbind("click").click(function () {
        $(".rightBox div.left li").removeClass("active");
        $(".rightBox div.right ul").removeClass("active");
        $(this).addClass("active");
        var name = $(this).attr("name");
        $("#" + name).addClass("active");
    });
    $("#knResult tbody td").unbind("click").click(function () {
        var type = G.query("type", "?" + $("#game_box_title li.active a[data-action]").attr("data-action"));
        var mymax = parseInt($("#gameTitle li.active").attr("data-max"));
        var ys = $("#tool_ys_input").val();
        var index = $(this).attr("index");
        var ary = __sysinfo.animalsAry[index].split(",");
        var s, odds;
        for (var i = 0; i < ary.length; i++) {
            s = parseInt(ary[i]) < 10 ? "0" + ary[i] : ary[i];
            if (type == 16 || type == 29) {
                odds = $("#gameBox .game_con li[data-name='" + s + "']").find("span.p a.red").html();
                if (G.DecimalSign(odds) || odds.toString().indexOf("/") > -1) {
                    $("#gameBox .game_con li[data-name='" + s + "']").find("span.in a.radioSim").addClass("radioPoint");
                    enachRadioPoint($("#gameBox .game_con li[data-name='" + s + "']").find("span.in a"), mymax);
                }
            } else {
                odds = $("#gameBox .game_con li[data-name='" + s + "']").find("span.p a.oddsEvent").html();
                if (G.DecimalSign(odds) && (G.NumberSign(ys) || ys == "")) {
                    $("#gameBox .game_con li[data-name='" + s + "']").find("span.in input[type='text']").addClass("check").val(ys);
                }
            }
        }
    });
}