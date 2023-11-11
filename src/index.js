"use strict";

{

	function $(selector) {
		return document.querySelector(selector);
	};

	$.all = function(selector) {
		return document.querySelectorAll(selector);
	}

	$.id = function(id) {
		return document.getElementById(id);
	};

	function el(tagName, init, child) {
		return function() {
			if(typeof arguments[0] === "object") {
				let init_buffer = JSON.parse(JSON.stringify(init));
				init_buffer.style += arguments[0].style? arguments[0].style.replace(/\t|\n/g, "") : "";
				delete arguments[0].style;
				Object.assign(init_buffer, arguments[0]);

				return el(tagName, init_buffer, arguments[1]);
			} else {
				let attr_string = "";
				for(const index in init) {
					attr_string += (index + "=\"" + init?.[index] + "\""); // optional chain included
				};

				return `<${ tagName }\u0020${ attr_string }${ ((tagName === "input")? "/>" : `>${ child?.join("") }</${ tagName }>`) }`;// optional chain included
			};
		};
	};

	const input_temp = el("input", { style: "" });

	const date_temp = input_temp({
		class: "date",
		type: "number",
		style: `
			top: 142.5px;
			height: 53px;
			font-size: 25px;
			text-align: right;
		`,
		arrowdown: "shimei_kana"
	});

	const birth_temp = input_temp({
		class: "date",
		type: "number",
		style: `
			top: 403px;
			height: 48px;
			font-size: 24px;
			text-align: right;
		`,
		arrowdown: "address_1_kana"
	})

	const shimei_temp = input_temp({
		type: "text",
		style: `
			left: 250px;
			width: 559px;
		`
	});

	$`svg#placeholder`.insertAdjacentHTML("beforeend", el("foreignObject", {
		style: `	
			position: relative;
			padding: 0px;
			margin: 0px;
			width: 100%;
			height: 100%;
		`
	}, [
		el("style", null, [`
			* {
				position: absolute;
				--selected-bg: rgba(0, 0, 0, 0.1);
			}
			* > div > a {
				position: relative;
			}
			input:not([type="range"]), textarea {
				appearance: textfield;
				border: none;
				font-family: serif;
				background-color: transparent;
				border-radius: 4px;
			}
			textarea {
				resize: none;
			}
			input:not([type="range"]):focus, textarea:focus {
				outline: none;
			}
			input:not([type="range"]):hover:not(.static), textarea:hover:not(.static) {
				background-color: rgba(0, 0, 0, 0.075)
			}
			input:not([type="range"])::-webkit-outer-spin-button, input:not([type="range"])::-webkit-inner-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
			input#age:hover {
				cursor: help;
			}

			input.history {
				height: 44px;
				font-size: 24px;
			}
			input.history.year {
				width: 105px;
				text-align: center;
			}
			input.history.year.left {
				left: 138px;
			}
			input.history.year.right {
				left: 1332px;
			}
			input.history.month {
				width: 45px;
				text-align: center;
			}
			input.history.month.left {
				left: 252px;
			}
			input.history.month.right {
				left: 1447px;
			}
			input.history.content {
				width: 808px;
				padding-left: 16px;
				padding-right: 16px;
			}
			input.history.content.left {
				left: 308px;
			}
			input.history.content.right {
				left: 1501px;
			}
			input.wishes {
				height: 44px;
				font-size: 24px;
				left: 1333px;
				width: 1005px;
			}
			input.address, textarea.address {
				left: 270px;
				width: 675px;
			}


		`])(),

		el("div", {
			class: "hide_while_print",
			style: `
				top: 90px;
				right: 140px;
				width: auto;
				font-size: 20px;
				text-align: right;
				white-space: pre;
				font-family: system-ui;
			`,
		}, [

			el("a", {
				href: "https://doda.jp/guide/rireki/#bookmark_Count_01",
				target: "_blank",
			}, ["履歴書の書きかた"])(),

			"&nbsp;&nbsp;",

			el("a", {
				id: "print_pdf",
				href: "javascript:print()"
			}, ["プリントする（Ctrl + P）"])(),
		])(),

		el("div", {
			class: "hide_while_print",
			style: `
				bottom: 96px;
				right: 140px;
				width: auto;
				font-size: 20px;
				text-align: right;
				white-space: pre;
				font-family: system-ui;
			`,
		}, [
			el("a", {
				href: "https://github.com/ihasq/rireki",
				target: "_blank",
			}, ["ソースコード（GitHub）"])(),

			"&nbsp;&nbsp;",

			el("a", {
				href: "https://licenses.opensource.jp/MIT/MIT.html",
				target: "_blank",
			}, ["利用規約（MITライセンス）"])(),
		])(),


		el("label", {
			class: "hide_while_print",
			style: `
				user-select: none;
				top: 94px;
				right: 38.5%;
				font-size: 20px;
			`
		}, [
			"オートセーブ（推奨）",
			input_temp({
				id: "autosave",
				style: `
					padding: 0px;
					margin: 0px;
					width: 20px;
					height: 20px;
				`,
				type: "checkbox",
				checked: "",
			})()
		])(),

		date_temp({
			id: "date_year",
			style: "left: 590px; width: 68px;"
		})(),

		date_temp({
			id: "date_month",
			style: "left: 686px; width: 34px;"
		})(),

		date_temp({
			id: "date_day",
			style: "left: 740px; width: 34px;"
		})(),

		shimei_temp({
			id: "shimei_kana",
			style: `
				top: 206px;
				height: 25px;
				font-size: 20px;
			`,
			placeholder: "りれきしょ　　　　　　　こうぼう",
			arrowdown: "shimei_kanji",
		})(),

		shimei_temp({
			id: "shimei_kanji",
			style: `
				top: 241px;
				height: 153px;
				font-size: 60px;
			`,
			placeholder: "履歴書　工房",
			arrowdown: "birth_year",
		})(),

		birth_temp({
			id: "birth_year",
			style: `
				left: 284px;
				width: 66px;
			`,
			value: "2002",
		})(),

		birth_temp({
			id: "birth_month",
			style: `
				left: 380px;
				width: 46px;
			`,
			value: "04",
		})(),

		birth_temp({
			id: "birth_day",
			style: `
				left: 453px;
				width: 50px;
			`,
			value: "01",
		})(),

		input_temp({
			id: "age",
			class: "static",
			type: "number",
			style: `
				top: 403px;
				left: 647px;
				height: 48px;
				width: 40px;
				font-size: 24px;
				text-align: center;
			`,
			value: "00",
			readonly: "",
		})(),

		input_temp({
			id: "gender",
			type: "text",
			style: `
				top: 403px;
				left: 900px;
				height: 48px;
				width: 176px;
				font-size: 24px;
				text-align: center;
			`,
			arrowdown: "phonenumber_1"
		})(),

		el("label", {
			class: "hide_while_print",
			id: "about_myself_fontsize_placeholder",
			style: `
				top: 975px;
				left: 2000px;
			`
		}, [
			"文字サイズ: ",
			el("span", { id: "about_myself_fontsize_px" }, ["24"])(),
			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
			input_temp({ id: "about_myself_fontsize", type: "range", min: "20", max: "40", value: "24", style: "width: 200px"})()
		])(),

		el("textarea", {
			id: "about_myself",
			style: `
				top: 1010px;
				left: 1333px;
				height: 311.5px;
				width: 1003.5px;
				font-size: 20.85px;
			`,
			wrap: "hard",
			arrowdown: "wishes_0"
		})(),

		(function() {
			let [template_string_buffer, style_top_buffer] = ["", 459];
			for(let i = 0; i < 2; i++) {
				template_string_buffer += [
					input_temp({
						class: "address",
						id: `address_${i + 1}_kana`,
						style: `
							top: ${style_top_buffer}px;
							height: 25px;
							font-size: 20px;
						`,
						type: "text",
						arrowup: `address_${i - 1}_postcode`,
						arrowdown: `address_${i + 1}_postcode`,
					})(),
					input_temp({
						class: "address",
						id: `address_${i + 1}_postcode`,
						style: `
							top: ${style_top_buffer + 33}px;
							height: 23px;
							font-size: 22px;
						`,
						type: "text",
						arrowdown: `address_${i + 1}_kanji`
					})(),
					el("textarea", {
						class: "address",
						id: `address_${i + 1}_kanji`,
						style: `
							top: ${style_top_buffer + 57}px;
							height: 68px;
							font-size: 34px;
						`,
						wrap: "hard",

						arrowup: (i === 0)? "gender" : "address_1_kanji",
						arrowdown: (i === 0)? "history_1" : "address_2_kanji"
					})(),
					input_temp({
						id: `phonenumber_${i + 1}`,
						style: `
							top: ${style_top_buffer + 32}px;
							left: 957px;
							height: 64px;
							width: 186px;
							font-size: 24px;
							text-align: center;
						`,
						type: "text",
						arrowup: (i === 0)? "gender" : "phonenumber_1",
						arrowdown: (i === 0)? "phonenumber_2" : "history_1"
					})()
				].join("");
				style_top_buffer += 136.5;
			};
			return template_string_buffer;
		})(),

		(function() {
			let [template_string_buffer, style_top_buffer] = ["", 800.5];
			for(let i = 0; i < 28; i++) {
				template_string_buffer += [
					input_temp({
						class: `history year ${(i < 15)? "left" : "right"}`,
						id: `history_${i}_year`,
						style: `top: ${style_top_buffer}px`,

						next: `history_${i}_month`,
						arrowup: (i === 0)? "address_2_kanji" : `history_${i - 1}_year`,
						arrowdown: (i === 28)? "" : `history_${i + 1}_year`,
						type: "text"
					})(),
					input_temp({
						class: `history month ${(i < 15)? "left" : "right"}`,
						id: `history_${i}_month`,
						style: `top: ${style_top_buffer}px`,

						next: `history_${i}_day`,
						arrowup: (i === 0)? "address_2_kanji" : `history_${i - 1}_month`,
						arrowdown: (i === 28)? "" : `history_${i + 1}_month`,
						type: "text"
					})(),
					input_temp({
						class: `history content ${(i < 15)? "left" : "right"}`,
						id: `history_${i}`,
						style: `top: ${style_top_buffer}px`,

						next: `history_${i + 1}_year`,
						arrowup: (i === 0)? "address_2_kanji" : `history_${i - 1}`,
						arrowdown: (i === 28)? "" : `history_${i + 1}`,
						type: "text",
						placeholder: (i === 0)? "「学歴」「職歴」「賞罰」のいずれかを入力して開始、「以上」で終了" : ""
					})(),
				].join("");
				style_top_buffer =
					(i === 14)? 184 :
					(i === 21)? 613 : Math.round((style_top_buffer + 54.81) * 1000) / 1000;
			};
			return template_string_buffer;
		})(),

		(function() {
			let [template_string_buffer, style_top_buffer] = ["", 1404.5];
			for(let i = 0; i < 4; i++) {
				template_string_buffer += input_temp({
					class: "wishes",
					id: `wishes_${i}`,
					style: `top: ${style_top_buffer}px;`,
					arrowup: (i === 0)? "about_myself" : `wishes_${i - 1}`,
					arrowdown: (i === 3)? "" : `wishes_${i + 1}`
				})()
				style_top_buffer = Math.round((style_top_buffer + 54.81) * 1000) / 1000;
			};
			return template_string_buffer;
		})()
	])().replace(/\t/g, ""));

	const user_state = {
		autosave: true,
	};

	// const arrow_ref_cache = Object.create(null); 
	
	// setTimeout(function() {
	// 	$.all`input, textarea`.forEach(function(element) {
	// 		arrow_ref_cache[element.id] = Object.create(null);
	// 		["arrowup", "arrowdown"].forEach(function(code) {
	// 			arrow_ref_cache[element.id][code] = element.getAttribute(code);
	// 			element.removeAttribute(code);
	// 		});
	// 	});
	// });

	const date_buffer = Object.create(null);

	setTimeout(function() {
		Object.assign(date_buffer, {
			birth_year: Number($.id`birth_year`.value),
			birth_month: Number($.id`birth_month`.value),
			birth_day: Number($.id`birth_day`.value),
			date_year: Number($.id`date_year`.value),
			date_month: Number($.id`date_month`.value),
			date_day: Number($.id`date_day`.value),
		});
		console.dir(date_buffer);
	});

	function refresh_age(target) {
		setTimeout(function() {
			if(target) {
				date_buffer[target.id] = Number(target.value);
				$.id(target.id).value = "0".repeat((/_year/.test(target.id)? 4 : 2) - target.value.length) + target.value;
			};
			$.id("age").value = date_buffer.date_year - date_buffer.birth_year - (new Date(date_buffer.date_year, date_buffer.date_month - 1, date_buffer.date_day) < new Date(date_buffer.date_year, date_buffer.birth_month - 1, date_buffer.birth_day));
		});
	};

	function check_query(target) {
		function align_content(target) {
			setTimeout(function() {							
				if(/学歴|職歴|賞罰|学\u3000歴|職\u3000歴|賞\u3000罰|以上/.test(target.value)) {
					// target.blur();
					$.id(target.id + "_year").value = "";
					$.id(target.id + "_month").value = "";
					target.style.textAlign = "center";
					if(target.value === "以上") {
						target.style.textAlign = "right";
					} else {
						if(/学歴|職歴|賞罰/.test(target.value)) {
							target.value = target.value.split("").join("\u3000");
						};
					};
				} else {
					target.style.textAlign = "left";
				};
			}, 0)
		};
		switch(typeof target) {
			case "string":
				if(target === "all") {
					$.all("input.history.content").forEach(function(target) {
						align_content(target);
					})
				}
			break;
			case "object":
				align_content(target);
			break;
		}
	};

	const date = new Date();

	[["date_year", date.getFullYear()], ["date_month", date.getMonth() + 1], ["date_day", date.getDate()], ].forEach(function([id, value]) {
		$.id(id).value = value;
	});

	[["shimei_kana", "読み仮名は氏名のそれぞれの真上に配置します。"], ["age", "年齢は上記の日付と生年月日から自動で算出されます。"], ["gender", "性別欄の記載は任意です。未記載とすることも可能です。"], ].forEach(function([className, desc]) {
		$.id(className).title = desc;
	});

	// Add eventlistener to svg#placeholder > foreignObject

	[
		[
			"keydown",

			function(event) {
				switch(event.target.tagName) {
					case "INPUT": case "TEXTAREA":

						switch(event.code) {
							// case "ArrowUp":
							// case "ArrowDown":

							// 	if(/(birth|date)_(year|month|date)/.test(event.target.id)) {
							// 		event.preventDefault();
							// 	};
							// 	$.id(arrow_ref_cache[event.target.id][event.code.toLowerCase()])?.select(); // optional chain included

							// break;

							// case "ArrowLeft":
							// case "ArrowRight":
							// 	document.getSelection()
							// break;

							case "Escape":

								document.activeElement.blur();

							break;

							default:

								if(event.target.id in date_buffer) {
									console.log("called")
									refresh_age(event.target);
								};
						};

					break;
				};
			},

			{ passive: true }
		],

		[
			"change",

			function(event) {

				switch(event.target.tagName) {
					case "INPUT":
						switch(event.target.id) {
							case "autosave":
								setTimeout(function() {
									user_state.autosave = $.id`autosave`.checked;
								});
							break;
							default:
								if(/history_[0-9]/.test(event.target.id)) {			
									check_query(event.target);
								};
						}
					break;
				};

				if(event.target.value_cache !== event.target.value) {
					window.localStorage.setItem(event.target.id, event.target.value);
					console.log("saved")
					event.target.value_cache = event.target.value;
				};


			},
			
			{ passive: true }
		],

		[
			"input",
			
			function(event) {
				if(event.target.id === "about_myself_fontsize") {
					$.id`about_myself`.style.fontSize = event.target.value + "px";
					$.id`about_myself_fontsize_px`.textContent = event.target.value;
				};
			},

			{ passive: true }
		],

	].forEach(function() {

		$`svg#placeholder > foreignObject`.addEventListener(...arguments[0]);

	});

	// Add eventlistener to window

	[
		[
			"beforeunload",

			function(event) {
				if(!user_state.autosave) {
					event.preventDefault();
				};
			},

			{ passive: false },
		],

		[
			"unload",

			function() {
				if(!user_state.autosave) {
					localStorage.clear();
				};	
			},

			{ passive: true }
		],

	].forEach(function() {
		window.addEventListener(...arguments[0])
	});

	$.all`input:not(#age, .date), textarea`.forEach(function(element) {
		const local_value = window.localStorage.getItem(element.id);
		element.value = local_value? local_value : "";
	});

	$.id`shimei_kanji`.select();

	check_query("all");

	refresh_age();

};