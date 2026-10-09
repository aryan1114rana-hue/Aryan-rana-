(() => {
  const localeKey = 'aryan-travel-language';
  const themeKey = 'aryan-travel-theme';
  let language = localStorage.getItem(localeKey) === 'hi' ? 'hi' : 'en';
  const languageButton = document.querySelector('#languageToggle');
  const themeButton = document.querySelector('#themeToggle');

  function applyLanguage(nextLanguage) {
    language = nextLanguage;
    localStorage.setItem(localeKey, language);
    document.documentElement.lang = language;
    document.querySelectorAll('[data-en][data-hi]').forEach(element => {
      const value = element.dataset[language];
      if (element.dataset.html === 'true') element.innerHTML = value;
      else if (element.children.length && element.firstChild?.nodeType === Node.TEXT_NODE) element.firstChild.textContent = value;
      else element.textContent = value;
    });
    document.querySelectorAll('[data-en-placeholder][data-hi-placeholder]').forEach(element => {
      element.placeholder = language === 'hi' ? element.dataset.hiPlaceholder : element.dataset.enPlaceholder;
      element.setAttribute('aria-label', element.placeholder);
    });
    document.querySelectorAll('[data-en-alt][data-hi-alt]').forEach(element => {
      element.alt = language === 'hi' ? element.dataset.hiAlt : element.dataset.enAlt;
    });
    if (languageButton) {
      languageButton.textContent = language === 'en' ? 'हिंदी' : 'EN';
      languageButton.setAttribute('aria-label', language === 'en' ? 'हिंदी में बदलें' : 'Switch to English');
      languageButton.setAttribute('aria-pressed', language === 'hi');
    }
    if (themeButton) {
      themeButton.setAttribute('aria-label', language === 'hi' ? 'थीम बदलें' : 'Change color theme');
    }
    document.title = `${document.body.dataset.title || 'Aryan Travel'}${language === 'hi' ? ' — यात्रा करें, अपने अंदाज़ में' : ' — Go where you feel'}`;
    window.dispatchEvent(new CustomEvent('languagechange', { detail: language }));
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(themeKey, theme);
    if (themeButton) {
      themeButton.textContent = theme === 'dark' ? '☀' : '◐';
      themeButton.setAttribute('aria-pressed', theme === 'dark');
      themeButton.title = theme === 'dark' ? (language === 'hi' ? 'हल्की थीम' : 'Light theme') : (language === 'hi' ? 'गहरी थीम' : 'Dark theme');
    }
  }

  languageButton?.addEventListener('click', () => applyLanguage(language === 'en' ? 'hi' : 'en'));
  themeButton?.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
  applyTheme(localStorage.getItem(themeKey) === 'dark' ? 'dark' : 'light');
  applyLanguage(language);

  const destinations = [
    { key: 'Dolomites', country: 'Italy', countryHi: 'इटली', region: 'Europe', regionHi: 'यूरोप', coords: [46.4102, 11.8440], price: 1240, image: 'photo-1519681393784-d120267933ba', nameHi: 'डोलोमाइट्स', tag: 'Mountain air', tagHi: 'पहाड़ी सुकून', duration: '7 days', durationHi: '7 दिन', description: 'Quiet alpine trails, family-run rifugios, and mornings worth slowing down for.', descriptionHi: 'शांत पहाड़ी रास्ते, परिवार द्वारा चलाए जाने वाले रिफ्यूजी और सुकून भरी सुबहें।' },
    { key: 'Kyoto', country: 'Japan', countryHi: 'जापान', region: 'Asia', regionHi: 'एशिया', coords: [35.0116, 135.7681], price: 1680, image: 'photo-1493976040374-85c8e12f0c0e', nameHi: 'क्योटो', tag: 'Slow mornings', tagHi: 'धीमी सुबहें', duration: '9 days', durationHi: '9 दिन', description: 'Lantern-lit lanes, temple gardens, and the small rituals that make a place feel like home.', descriptionHi: 'लालटेन वाली गलियाँ, मंदिरों के बगीचे और नई जगह को अपना-सा बनाने वाले छोटे रिवाज़।' },
    { key: 'Marrakech', country: 'Morocco', countryHi: 'मोरक्को', region: 'Africa', regionHi: 'अफ़्रीका', coords: [31.6295, -7.9811], price: 990, image: 'photo-1539020140153-e479b8c22e70', nameHi: 'माराकेश', tag: 'A little color', tagHi: 'रंगों की दुनिया', duration: '6 days', durationHi: '6 दिन', description: 'Colorful medina lanes, tucked-away riads, and dinners that linger into the evening.', descriptionHi: 'रंगीन मदीना की गलियाँ, छिपे हुए रियाद और देर तक चलने वाले खाने।' },
    { key: 'Patagonia', country: 'Chile', countryHi: 'चिली', region: 'Americas', regionHi: 'अमेरिका', coords: [-50.9423, -73.4068], price: 2150, image: 'photo-1464822759023-fed622ff2c3b', nameHi: 'पैटागोनिया', tag: 'Wide open', tagHi: 'खुला आसमान', duration: '10 days', durationHi: '10 दिन', description: 'Big skies, honest hikes, and landscapes that make room for a little perspective.', descriptionHi: 'खुला आसमान, शानदार पैदल रास्ते और नज़रिया बदल देने वाले नज़ारे।' },
    { key: 'Amalfi Coast', country: 'Italy', countryHi: 'इटली', region: 'Europe', regionHi: 'यूरोप', coords: [40.6281, 14.4849], price: 1490, image: 'photo-1533105079780-92b9be482077', nameHi: 'अमाल्फ़ी तट', tag: 'By the sea', tagHi: 'समुद्र के पास', duration: '8 days', durationHi: '8 दिन', description: 'Slow coastal roads, lemon groves, and long lunches above the sea.', descriptionHi: 'समुद्र के किनारे धीमे रास्ते, नींबू के बाग़ और लंबे दोपहर के खाने।' },
    { key: 'Bali', country: 'Indonesia', countryHi: 'इंडोनेशिया', region: 'Asia', regionHi: 'एशिया', coords: [-8.4095, 115.1889], price: 1120, image: 'photo-1537996194471-e657df975ab4', nameHi: 'बाली', tag: 'Find your flow', tagHi: 'अपनी लय में', duration: '8 days', durationHi: '8 दिन', description: 'Green rice terraces, quiet stays, and mornings that unfold at your own pace.', descriptionHi: 'हरे-भरे धान के खेत, शांत ठिकाने और आपके हिसाब से खुलती सुबहें।' },
    { key: 'Serengeti', country: 'Tanzania', countryHi: 'तंज़ानिया', region: 'Africa', regionHi: 'अफ़्रीका', coords: [-2.3333, 34.8333], price: 2390, image: 'photo-1516426122078-c23e76319801', nameHi: 'सेरेन्गेटी', tag: 'Wild at heart', tagHi: 'जंगल की पुकार', duration: '8 days', durationHi: '8 दिन', description: 'Savanna mornings, brilliant local guides, and wild places worth protecting.', descriptionHi: 'सवाना की सुबहें, स्थानीय गाइड और संजोने लायक़ प्राकृतिक नज़ारे।' },
    { key: 'Yucatán', country: 'Mexico', countryHi: 'मेक्सिको', region: 'Americas', regionHi: 'अमेरिका', coords: [20.7099, -89.0943], price: 1320, image: 'photo-1518638150340-f706e86654de', nameHi: 'युकातान', tag: 'Somewhere sunny', tagHi: 'धूप भरा सफ़र', duration: '7 days', durationHi: '7 दिन', description: 'Clear cenotes, local flavors, and a little space for happy accidents.', descriptionHi: 'साफ़ पानी वाले सेनोटे, स्थानीय स्वाद और अनायास मिलने वाले पलों के लिए समय।' }
  ];
  window.AryanTravel = { destinations, get language() { return language; } };

  const bookingForm = document.querySelector('#bookingForm');
  if (bookingForm) {
    const params = new URLSearchParams(location.search);
    const requestedTrip = params.get('trip');
    if (requestedTrip && bookingForm.elements.trip) bookingForm.elements.trip.value = requestedTrip;
    bookingForm.addEventListener('submit', event => {
      event.preventDefault();
      if (!bookingForm.reportValidity()) return;
      const values = new FormData(bookingForm);
      const trip = destinations.find(item => item.key === values.get('trip'));
      const message = language === 'hi'
        ? `नमस्ते Aryan Travel, मैं ${trip.nameHi}, ${trip.countryHi} की यात्रा के बारे में पूछना चाहता/चाहती हूँ। तारीख: ${values.get('date')}; यात्री: ${values.get('travelers')}; ईमेल: ${values.get('email')}; संदेश: ${values.get('notes') || 'कोई अतिरिक्त जानकारी नहीं।'}`
        : `Hello Aryan Travel, I would like to enquire about ${trip.key}, ${trip.country}. Date: ${values.get('date')}; travellers: ${values.get('travelers')}; email: ${values.get('email')}; notes: ${values.get('notes') || 'None.'}`;
      const result = document.querySelector('#bookingResult');
      const text = language === 'hi' ? 'आपका संदेश तैयार है। WhatsApp में साझा करके अपनी पसंद का संपर्क चुनें।' : 'Your message is ready. Open WhatsApp and choose the contact to share it with.';
      const action = language === 'hi' ? 'WhatsApp खोलें →' : 'Open WhatsApp →';
      result.innerHTML = `${text} <a class="text-action" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(message)}">${action}</a>`;
      result.classList.add('visible');
    });
  }

  const destinationList = document.querySelector('#destinationList');
  if (destinationList) {
    const search = document.querySelector('#destinationSearch');
    const regionSelect = document.querySelector('#regionFilter');
    const filterCards = () => {
      const query = search.value.trim().toLowerCase();
      destinationList.querySelectorAll('.trip-card').forEach(card => {
        const matchesQuery = card.dataset.search.toLowerCase().includes(query);
        const matchesRegion = regionSelect.value === 'All' || card.dataset.region === regionSelect.value;
        card.hidden = !(matchesQuery && matchesRegion);
      });
    };
    search.addEventListener('input', filterCards);
    regionSelect.addEventListener('change', filterCards);
    window.addEventListener('languagechange', () => {
      regionSelect.querySelectorAll('option').forEach((option, index) => option.textContent = language === 'hi' ? ['सभी क्षेत्र','यूरोप','एशिया','अफ़्रीका','अमेरिका'][index] : ['All regions','Europe','Asia','Africa','Americas'][index]);
      search.placeholder = language === 'hi' ? 'जगह खोजें' : 'Search places';
    });
    window.dispatchEvent(new CustomEvent('languagechange', { detail: language }));
  }

  const mapElement = document.querySelector('#worldMap');
  if (mapElement && window.L) {
    const map = L.map(mapElement, { scrollWheelZoom: false }).setView([25, 15], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
    const markers = new Map();
    destinations.forEach(place => {
      const marker = L.marker(place.coords).addTo(map);
      marker.bindPopup('');
      markers.set(place.key, marker);
      const button = document.querySelector(`[data-map-place="${place.key}"]`);
      button?.addEventListener('click', () => { map.flyTo(place.coords, 6, { duration: 1.2 }); marker.openPopup(); });
    });
    function translatePopups() {
      destinations.forEach(place => {
        const marker = markers.get(place.key);
        const name = language === 'hi' ? place.nameHi : place.key;
        const country = language === 'hi' ? place.countryHi : place.country;
        const action = language === 'hi' ? 'यात्रा देखें →' : 'View trip →';
        marker.setPopupContent(`<strong>${name}, ${country}</strong><br><a href="trip.html?trip=${encodeURIComponent(place.key)}">${action}</a>`);
      });
    }
    translatePopups();
    window.addEventListener('languagechange', translatePopups);
  }

  const tripPage = document.querySelector('#tripPage');
  if (tripPage) {
    const key = new URLSearchParams(location.search).get('trip') || 'Dolomites';
    const place = destinations.find(item => item.key === key) || destinations[0];
    const renderTrip = () => {
      const hi = language === 'hi';
      const name = hi ? place.nameHi : place.key;
      const country = hi ? place.countryHi : place.country;
      document.title = `${name}, ${country} — Aryan Travel`;
      document.querySelector('#tripImage').src = `https://images.unsplash.com/${place.image}?auto=format&fit=crop&w=1500&q=88`;
      document.querySelector('#tripImage').alt = hi ? `${name}, ${country} के नज़ारे` : `Scenery in ${place.key}, ${place.country}`;
      document.querySelector('#tripName').textContent = `${name}, ${country}`;
      document.querySelector('#tripTag').textContent = hi ? place.tagHi : place.tag;
      document.querySelector('#tripDescription').textContent = hi ? place.descriptionHi : place.description;
      document.querySelector('#tripDuration').textContent = hi ? place.durationHi : place.duration;
      document.querySelector('#tripPrice').textContent = `$${place.price.toLocaleString()}`;
      document.querySelector('#tripBook').href = `booking.html?trip=${encodeURIComponent(place.key)}`;
      const itinerary = hi ? ['स्थानीय गाइड के साथ आगमन और परिचय','प्रकृति, स्वाद और आस-पास की संस्कृति की खोज','आराम से विदाई और आगे का सफ़र'] : ['Arrive, settle in, and meet your local guide','Explore the landscape, food, and local culture','A slow morning and an easy departure'];
      document.querySelectorAll('.itinerary p').forEach((paragraph,index) => paragraph.textContent = itinerary[index]);
      document.querySelectorAll('.itinerary strong').forEach((heading,index) => heading.textContent = hi ? [`पहला दिन · स्वागत`,`बीच के दिन · खोज`,`आख़िरी दिन · विदाई`][index] : [`Day one · Arrive`,`In between · Explore`,`Last day · Depart`][index]);
    };
    renderTrip();
    window.addEventListener('languagechange', renderTrip);
  }
})();
