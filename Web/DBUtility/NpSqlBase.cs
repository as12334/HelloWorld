using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;
using Npgsql;

namespace Application.DBUtility
{
    public class NpSqlBase
    {
        public  DataSet ExecuteQuery(string sqrstr)
        {
            DataSet ds = new DataSet();
            try
            {        
                NpgsqlConnection SqlConn = new NpgsqlConnection("Host=192.168.0.88;Username=manager;Password=postgres;Database=lottery;Port=5504");
                using(NpgsqlDataAdapter sqldap = new NpgsqlDataAdapter(sqrstr, SqlConn))
                {
                    sqldap.Fill(ds);
                }
                return ds;
            }
            catch (System.Exception ex)
            { 
                return ds;
            }           
        }

        protected static List<T> TableToEntity<T>(DataTable dt) where T : class,new()
        {
            Type type = typeof(T);
            List<T> list = new List<T>();

            foreach (DataRow row in dt.Rows)
            {
                PropertyInfo[] pArray = type.GetProperties();
                T entity = new T();
                foreach (PropertyInfo p in pArray)
                {
                    if (row[p.Name] is Int64)
                    {
                        p.SetValue(entity, Convert.ToInt32(row[p.Name]), null);
                        continue;
                    }
                    p.SetValue(entity, row[p.Name], null);
                }
                list.Add(entity);
            }
            return list;
        }
    }
}