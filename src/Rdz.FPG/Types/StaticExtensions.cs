using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rdz.FPG
{
	public static class StaticExtensions
	{
		private static string _UserThemeCookieName = "FPGTheme";
		public static string UserTheme
		{
			get
			{
				if (HttpContext.Current.Request.Cookies[_UserThemeCookieName] != null)
				{
					return HttpContext.Current.Request.Cookies.Get(_UserThemeCookieName).Value;
				}
				return "united";
			}
		}
		public static void SetUserTheme(string themeName)
		{
			HttpContext.Current.Response.Cookies.Remove(_UserThemeCookieName);
			HttpCookie cookie = new HttpCookie(_UserThemeCookieName);
			cookie.Value = themeName;
			HttpContext.Current.Response.SetCookie(cookie);
		}


	}
}