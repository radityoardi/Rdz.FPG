using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Rdz.FPG.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			return View();
		}

		public ActionResult About()
		{
			ViewBag.Message = "Your application description page.";
			
			return View();
		}

		public ActionResult Contact()
		{
			return View();
		}

		public ActionResult BingImageToday(int numberOfImages, string cultureInfo)
		{
			var client = new RestClient("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=" + numberOfImages.ToString() + "&mkt=" + cultureInfo);
			var response = client.Execute(new RestRequest());
			return new ContentResult { Content = response.Content, ContentType = "application/json" };
			//return Json(System.Web.Helpers.Json.Decode(response.Content), JsonRequestBehavior.AllowGet);
		}

	}
}