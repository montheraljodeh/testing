using core.database;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;

namespace infra.database
{
    public class DbContext : IdbContext
    {
        public DbConnection connection => throw new NotImplementedException();
    }
}
