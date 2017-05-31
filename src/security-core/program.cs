using System;
using System.Linq;
using System.Text;

namespace SecurityCore
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                var command = args[0];
                var handler = new CommandHandler(command);
                var result = handler.Handle();
                Console.Write(result);
            }
            catch (Exception ex)
            {
                Console.Error.Write(GetFullDescription(ex));
            }
        }
        
        public static string GetFullDescription(Exception exception)
        {
            var sb = new StringBuilder();
            sb.AppendLine(string.Format("{0}: {1}", exception.GetType().Name, exception.Message));
            sb.AppendLine(exception.StackTrace);
            
            while (exception.InnerException != null)
            {
                exception = exception.InnerException;
                sb.AppendLine(string.Format("INNER {0}: {1}", exception.GetType().Name, exception.Message));
                sb.AppendLine(exception.StackTrace);
            }

            return sb.ToString();
        }
    }
}