var userTheme = 'united';
var generatedPassword = '';

var CharClasses = {
	"a": { UL: "Aa", N: "4", S: "@^" },
	"b": { UL: "Bb", N: "38", S: "&" },
	"c": { UL: "Cc", N: "", S: "{[<(" },
	"d": { UL: "Dd", N: "", S: "#" },
	"e": { UL: "Ee", N: "3", S: "" },
	"f": { UL: "Ff", N: "", S: "%" },
	"g": { UL: "Gg", N: "69", S: "&" },
	"h": { UL: "Hh", N: "", S: "#" },
	"i": { UL: "Ii", N: "1", S: "!" },
	"k": { UL: "Kk", N: "", S: "" },
	"l": { UL: "Ll", N: "1", S: "|" },
	"m": { UL: "Mm", N: "", S: "" },
	"n": { UL: "Nn", N: "", S: "" },
	"o": { UL: "Oo", N: "0", S: "*" },
	"p": { UL: "Pp", N: "", S: "" },
	"q": { UL: "Qq", N: "", S: "" },
	"r": { UL: "Rr", N: "", S: "" },
	"s": { UL: "Ss", N: "5", S: "$" },
	"t": { UL: "Tt", N: "7", S: "+" },
	"u": { UL: "Uu", N: "", S: "" },
	"v": { UL: "Vv", N: "", S: "" },
	"w": { UL: "Ww", N: "", S: "" },
	"x": { UL: "Xx", N: "", S: "" },
	"y": { UL: "Yy", N: "", S: "" },
	"z": { UL: "Zz", N: "2", S: "" },
	" ": { UL: "", N: "", S: "~-=" },
	".": { UL: "", N: "", S: ".,'\"*" }
};

if (Cookies.get('FPGTheme')) {
	userTheme = Cookies.get('FPGTheme');
} else {
	Cookies.set('FPGTheme', userTheme);
}
$('HEAD').append('<link id="themecss" rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/' + userTheme + '/bootstrap.min.css" />');

function changeTheme(ctrl) {
	var userTheme = ctrl.value;
	if (userTheme) {
		Cookies.set('FPGTheme', userTheme);
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