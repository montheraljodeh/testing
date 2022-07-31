using core.database;
using Microsoft.Extensions.Configuration;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;

namespace infra.database
{
    public class DbContext : IdbContext
    {
        private DbConnection _connection;
        private IConfiguration Iconfiguration;

        public DbContext(IConfiguration Iconfiguration)
        {
            this.Iconfiguration = Iconfiguration;
        }
        public DbConnection connection
        {

            get
            {
                if (_connection==null)
                {
                    _connection = new OracleConnection(Iconfiguration["ConnectionStrings:DBConnectionString"]);

                    _connection.Open();
                }else if(_connection.State != System.Data.ConnectionState.Open)
                {
                    _connection.Open();
                }
                return _connection;
            }
        }
    }
}
