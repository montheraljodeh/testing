using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;

namespace core.database
{
    public interface IdbContext
    {

        public DbConnection connection { get; } //method just connect to datbase
    }
}
