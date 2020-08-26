var userTheme = 'united';
var generatedPassword = '';

var CharClasses = {
	"a": { UL: "Aa", N: "4", S: "@^" },
	"b": { UL: "Bb", N: "38", S: "&>})" },
	"c": { UL: "Cc", N: "", S: "{[<(" },
	"d": { UL: "Dd", N: "", S: ">})" },
	"e": { UL: "Ee", N: "3", S: "" },
	"f": { UL: "Ff", N: "", S: "%" },
	"g": { UL: "Gg", N: "69", S: "&%" },
	"h": { UL: "Hh", N: "", S: "#" },
	"i": { UL: "Ii", N: "1", S: "!" },
	"k": { UL: "Kk", N: "", S: "" },
	"l": { UL: "Ll", N: "1", S: "|/\\" },
	"m": { UL: "Mm", N: "", S: "" },
	"n": { UL: "Nn", N: "", S: "^" },
	"o": { UL: "Oo", N: "0", S: "*" },
	"p": { UL: "Pp", N: "", S: "" },
	"q": { UL: "Qq", N: "", S: "?" },
	"r": { UL: "Rr", N: "", S: "" },
	"s": { UL: "Ss", N: "5", S: "$" },
	"t": { UL: "Tt", N: "7", S: "+" },
	"u": { UL: "Uu", N: "", S: "" },
	"v": { UL: "Vv", N: "", S: "" },
	"w": { UL: "Ww", N: "", S: "" },
	"x": { UL: "Xx", N: "", S: "*" },
	"y": { UL: "Yy", N: "", S: "" },
	"z": { UL: "Zz", N: "2", S: "" },
	" ": { UL: "", N: "", S: "_~-=:;" },
	".": { UL: "", N: "", S: ".,'/\\\"*`:;" }
};

$(document).ready(function () {
	var getRandom = function (min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	/* the method below will download json latest images from the server directly */
	jQuery.fn.applyBingImageBackground = function () {
		var el = $(this);
		if ($.cookie("self-reset-lastimageurl")) {
			$.each(el, function (i, v) {
				var lastimageurl = $.cookie("self-reset-lastimageurl");
				$(v).css('background', 'url("' + lastimageurl + '") center center/cover fixed');
			});
		} else {
			var bingdata = { numberOfImages: 5, market: "en-SG" };
			$.ajax({
				url: '/Home/BingImageToday',
				headers: {
					Accept: "application/json; charset=utf-8"
				},
				data: bingdata,
				success: function (data, xhr, xhr2) {
					$.each(el, function (i, v) {
						var lastimageurl = "https://www.bing.com" + data.images[getRandom(0, data.images.length - 1)].url;
						$.cookie("self-reset-lastimageurl", lastimageurl, { expires: 0.25 }); //set cookie for last image
						$(v).css('background', 'url("' + lastimageurl + '") center center/cover fixed');
					});
				},
				error: function (xhr, status, errorMsg) {
					console.error(errorMsg);
					console.log(xhr);
				}
			});
		}
	};
});

if ($.cookie('FPGTheme')) {
	userTheme = $.cookie('FPGTheme');
} else {
	$.cookie('FPGTheme', userTheme);
}
$('HEAD').append('<link id="themecss" rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/' + userTheme + '/bootstrap.min.css" />');

function changeTheme(ctrl) {
	var userTheme = ctrl.value;
	if (userTheme) {
		$.cookie('FPGTheme', userTheme);
		$("HEAD LINK[id='themecss']")[0].href = 'https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/' + userTheme + '/bootstrap.min.css';
	}
}

function generatePassword() {
	var IsUpperLower = $('#tglUpperLower')[0].checked;
	var IsNumbers = $('#tglNumbers')[0].checked;
	var IsSymbols = $('#tglSymbols')[0].checked;
	var PreferredPassword = $('#txtPreferred').val().toLowerCase().split('');

	for (var i = 0; i < PreferredPassword.length; i++) {
		if (CharClasses[PreferredPassword[i]]) {
			var cClass = CharClasses[PreferredPassword[i]].UL + (IsNumbers ? CharClasses[PreferredPassword[i]].N : '') + (IsSymbols ? CharClasses[PreferredPassword[i]].S : '');
			console.log(cClass);
			var rnd = Math.floor(Math.random() * cClass.length);
			PreferredPassword[i] = cClass[rnd];
		}
	}

	$('#txtGenerated').val(PreferredPassword.join(''));
}

function CopyClipboard(controlID) {
	/* Get the text field */
	var copyText = document.getElementById(controlID);

	/* Select the text field */
	copyText.select();
	copyText.setSelectionRange(0, 99999); /*For mobile devices*/

	/* Copy the text inside the text field */
	document.execCommand("copy");
}

$(document).ready(function () {
	$('BODY').applyBingImageBackground();
	$('.container.body-content').slideDown();
});
