using core.data;
using core.database;
using core.repoisitory;
using Dapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace infra.repoisitory
{
    public class mytestrepo : mytestrepoisitory
    {
        private readonly IdbContext context;

        public mytestrepo(IdbContext context)
        {
            this.context = context;
        }

        public bool insertmytest(mytest test)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofmytest",test.id,System.Data.DbType.Int32,direction:System.Data.ParameterDirection.Input);
            parameter.Add("firstname",test.fname,System.Data.DbType.String,direction:System.Data.ParameterDirection.Input);

            parameter.Add("salary", test.salary, System.Data.DbType.Decimal, direction: System.Data.ParameterDirection.Input);


           
            var result = context.connection.ExecuteAsync("insertmytest",parameter,commandType:System.Data.CommandType.StoredProcedure);

            return true;
        }

        public bool updatemytest(mytest test)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofmytest", test.id, dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Input);

            parameter.Add("firstname", test.fname, dbType: System.Data.DbType.String, direction: System.Data.ParameterDirection.Input);
            parameter.Add("salary1", test.salary, System.Data.DbType.Decimal, direction: System.Data.ParameterDirection.Input);



            var result = context.connection.ExecuteAsync("updatemytest", parameter,commandType:System.Data.CommandType.StoredProcedure);

            return true;

        }
    }
}
