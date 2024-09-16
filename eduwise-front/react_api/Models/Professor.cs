using System.ComponentModel.DataAnnotations;

namespace react_api.Models
{
    public class Professor
    {
        public int id {get;set;}
        public string? email {get; set;}
        public string? username {get;set;}
        public string? password {get;set;}
        public string? school {get;set;}
    }
}