using System;
using System.Linq;

namespace SecurityCore
{
    class Program
    {
        static void Main(string[] args)
        {
            var command = args[0];
            
            var handler = new CommandHandler(command);
            var result = handler.Handle();
            Console.WriteLine(result.ToString());
        }
        
        private static void Log(string key, string value)
        {
            Console.WriteLine($"{key} => {value}");
        }
    }
}

// SymmetricEncryption.GenerateKey::void
// SymmetricEncryption.Encrypt::key,value