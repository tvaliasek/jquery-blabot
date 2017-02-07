jQuery(function () {
	$.fn.vyblabol = function () {

		function elipsize(jqElement, paragraph) {
			var maxLength = parseInt(jqElement.data('blabot-elipsize'));
			var tmp = [];
			var currentLength = 0;
			if (maxLength > 0) {
				for (var i = 0; i < paragraph.length; i++) {
					var words = paragraph[i].split(' ');
					for (var j = 0; j < words.length; j++) {
						var newLength = currentLength + words[j].length;
						if (newLength >= maxLength + 4) {
							tmp.push('...');
							return tmp;
						} else {
							currentLength += words[j].length;
							tmp.push(words[j]);
						}
					}
				}
				return tmp;
			}
			return paragraph;
		}

		function getRandomIntInclusive(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		$('body').on('blabot-ready', function () {
			$('[data-blabot="true"]').each(function () {
				var paragraph = [];
				if (!$(this)[0].hasAttribute('data-blabot-exact')) {
					var min = ($(this)[0].hasAttribute('data-blabot-min')) ? parseInt($(this).data('blabot-min')) : 1;
					var max = ($(this)[0].hasAttribute('data-blabot-max')) ? parseInt($(this).data('blabot-max')) : 6;
					var maxSentenses = getRandomIntInclusive(min, max);
				} else {
					var maxSentenses = parseInt($(this).data('blabot-exact'));
				}

				for (var i = 0; i <= maxSentenses; i++) {
					var index = getRandomIntInclusive(0, 99);
					paragraph.push(blaboly[index]);
				}

				if ($(this)[0].hasAttribute('data-blabot-elipsize')) {
					paragraph = elipsize($(this), paragraph);
				}

				$(this).text(paragraph.join(' '));
			});
		});

		var blaboly = localStorage.getItem('blabot');

		if (blaboly == null) {
			$.get("http://api.blabot.net", {scount: 100, method: "list"}, function (response) {
				response = JSON.parse(response);
				if (response.hasOwnProperty('blabot') && response.blabot.hasOwnProperty('result') && response.blabot.result.length > 0) {
					blaboly = response.blabot.result;
					localStorage.setItem('blabot', JSON.stringify(blaboly));
					$('body').trigger('blabot-ready');
				}
			});
		} else {
			blaboly = JSON.parse(blaboly);
			$('body').trigger('blabot-ready');
		}

	};
});