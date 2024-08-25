import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import BikramSambat, { ADToBS } from 'bikram-sambat-js';

const countries = [
  { name: 'Afghanistan', code: 'AF', timezone: 'Asia/Kabul' },
  { name: 'Albania', code: 'AL', timezone: 'Europe/Tirane' },
  { name: 'Algeria', code: 'DZ', timezone: 'Africa/Algiers' },
  { name: 'Andorra', code: 'AD', timezone: 'Europe/Andorra' },
  { name: 'Angola', code: 'AO', timezone: 'Africa/Luanda' },
  { name: 'Argentina', code: 'AR', timezone: 'America/Argentina/Buenos_Aires' },
  { name: 'Armenia', code: 'AM', timezone: 'Asia/Yerevan' },
  { name: 'Australia', code: 'AU', timezone: 'Australia/Sydney' }, // You can add more cities like 'Australia/Perth', 'Australia/Melbourne', etc.
  { name: 'Austria', code: 'AT', timezone: 'Europe/Vienna' },
  { name: 'Azerbaijan', code: 'AZ', timezone: 'Asia/Baku' },
  { name: 'Bahamas', code: 'BS', timezone: 'America/Nassau' },
  { name: 'Bahrain', code: 'BH', timezone: 'Asia/Bahrain' },
  { name: 'Bangladesh', code: 'BD', timezone: 'Asia/Dhaka' },
  { name: 'Barbados', code: 'BB', timezone: 'America/Barbados' },
  { name: 'Belarus', code: 'BY', timezone: 'Europe/Minsk' },
  { name: 'Belgium', code: 'BE', timezone: 'Europe/Brussels' },
  { name: 'Belize', code: 'BZ', timezone: 'America/Belize' },
  { name: 'Benin', code: 'BJ', timezone: 'Africa/Porto-Novo' },
  { name: 'Bhutan', code: 'BT', timezone: 'Asia/Thimphu' },
  { name: 'Bolivia', code: 'BO', timezone: 'America/La_Paz' },
  { name: 'Bosnia and Herzegovina', code: 'BA', timezone: 'Europe/Sarajevo' },
  { name: 'Botswana', code: 'BW', timezone: 'Africa/Gaborone' },
  { name: 'Brazil', code: 'BR', timezone: 'America/Sao_Paulo' }, // Add more cities like 'America/Rio_Branco', 'America/Manaus', etc.
  { name: 'Brunei', code: 'BN', timezone: 'Asia/Brunei' },
  { name: 'Bulgaria', code: 'BG', timezone: 'Europe/Sofia' },
  { name: 'Burkina Faso', code: 'BF', timezone: 'Africa/Ouagadougou' },
  { name: 'Burundi', code: 'BI', timezone: 'Africa/Bujumbura' },
  { name: 'Cambodia', code: 'KH', timezone: 'Asia/Phnom_Penh' },
  { name: 'Cameroon', code: 'CM', timezone: 'Africa/Douala' },
  { name: 'Canada', code: 'CA', timezone: 'America/Toronto' }, // Add more cities like 'America/Vancouver', 'America/Halifax', etc.
  { name: 'Cape Verde', code: 'CV', timezone: 'Atlantic/Cape_Verde' },
  { name: 'Central African Republic', code: 'CF', timezone: 'Africa/Bangui' },
  { name: 'Chad', code: 'TD', timezone: 'Africa/Ndjamena' },
  { name: 'Chile', code: 'CL', timezone: 'America/Santiago' }, // Add more cities like 'Pacific/Easter'
  { name: 'China', code: 'CN', timezone: 'Asia/Shanghai' }, // Also add 'Asia/Urumqi' if needed
  { name: 'Colombia', code: 'CO', timezone: 'America/Bogota' },
  { name: 'Comoros', code: 'KM', timezone: 'Indian/Comoro' },
  { name: 'Congo', code: 'CG', timezone: 'Africa/Brazzaville' },
  { name: 'Costa Rica', code: 'CR', timezone: 'America/Costa_Rica' },
  { name: 'Croatia', code: 'HR', timezone: 'Europe/Zagreb' },
  { name: 'Cuba', code: 'CU', timezone: 'America/Havana' },
  { name: 'Cyprus', code: 'CY', timezone: 'Asia/Nicosia' },
  { name: 'Czech Republic', code: 'CZ', timezone: 'Europe/Prague' },
  { name: 'Denmark', code: 'DK', timezone: 'Europe/Copenhagen' },
  { name: 'Djibouti', code: 'DJ', timezone: 'Africa/Djibouti' },
  { name: 'Dominica', code: 'DM', timezone: 'America/Dominica' },
  { name: 'Dominican Republic', code: 'DO', timezone: 'America/Santo_Domingo' },
  { name: 'Ecuador', code: 'EC', timezone: 'America/Guayaquil' }, // Also add 'Pacific/Galapagos' if needed
  { name: 'Egypt', code: 'EG', timezone: 'Africa/Cairo' },
  { name: 'El Salvador', code: 'SV', timezone: 'America/El_Salvador' },
  { name: 'Equatorial Guinea', code: 'GQ', timezone: 'Africa/Malabo' },
  { name: 'Eritrea', code: 'ER', timezone: 'Africa/Asmara' },
  { name: 'Estonia', code: 'EE', timezone: 'Europe/Tallinn' },
  { name: 'Eswatini', code: 'SZ', timezone: 'Africa/Mbabane' },
  { name: 'Ethiopia', code: 'ET', timezone: 'Africa/Addis_Ababa' },
  { name: 'Fiji', code: 'FJ', timezone: 'Pacific/Fiji' },
  { name: 'Finland', code: 'FI', timezone: 'Europe/Helsinki' },
  { name: 'France', code: 'FR', timezone: 'Europe/Paris' },
  { name: 'Gabon', code: 'GA', timezone: 'Africa/Libreville' },
  { name: 'Gambia', code: 'GM', timezone: 'Africa/Banjul' },
  { name: 'Georgia', code: 'GE', timezone: 'Asia/Tbilisi' },
  { name: 'Germany', code: 'DE', timezone: 'Europe/Berlin' },
  { name: 'Ghana', code: 'GH', timezone: 'Africa/Accra' },
  { name: 'Greece', code: 'GR', timezone: 'Europe/Athens' },
  { name: 'Grenada', code: 'GD', timezone: 'America/Grenada' },
  { name: 'Guatemala', code: 'GT', timezone: 'America/Guatemala' },
  { name: 'Guinea', code: 'GN', timezone: 'Africa/Conakry' },
  { name: 'Guinea-Bissau', code: 'GW', timezone: 'Africa/Bissau' },
  { name: 'Guyana', code: 'GY', timezone: 'America/Guyana' },
  { name: 'Haiti', code: 'HT', timezone: 'America/Port-au-Prince' },
  { name: 'Honduras', code: 'HN', timezone: 'America/Tegucigalpa' },
  { name: 'Hungary', code: 'HU', timezone: 'Europe/Budapest' },
  { name: 'Iceland', code: 'IS', timezone: 'Atlantic/Reykjavik' },
  { name: 'India', code: 'IN', timezone: 'Asia/Kolkata' },
  { name: 'Indonesia', code: 'ID', timezone: 'Asia/Jakarta' }, // Add more like 'Asia/Pontianak', 'Asia/Makassar', 'Asia/Jayapura'
  { name: 'Iran', code: 'IR', timezone: 'Asia/Tehran' },
  { name: 'Iraq', code: 'IQ', timezone: 'Asia/Baghdad' },
  { name: 'Ireland', code: 'IE', timezone: 'Europe/Dublin' },
  { name: 'Israel', code: 'IL', timezone: 'Asia/Jerusalem' },
  { name: 'Italy', code: 'IT', timezone: 'Europe/Rome' },
  { name: 'Jamaica', code: 'JM', timezone: 'America/Jamaica' },
  { name: 'Japan', code: 'JP', timezone: 'Asia/Tokyo' },
  { name: 'Jordan', code: 'JO', timezone: 'Asia/Amman' },
  { name: 'Kazakhstan', code: 'KZ', timezone: 'Asia/Almaty' }, // Add more like 'Asia/Aqtau', 'Asia/Aqtobe'
  { name: 'Kenya', code: 'KE', timezone: 'Africa/Nairobi' },
  { name: 'Kiribati', code: 'KI', timezone: 'Pacific/Tarawa' },
  { name: 'Korea, North', code: 'KP', timezone: 'Asia/Pyongyang' },
  { name: 'Korea, South', code: 'KR', timezone: 'Asia/Seoul' },
  { name: 'Kuwait', code: 'KW', timezone: 'Asia/Kuwait' },
  { name: 'Kyrgyzstan', code: 'KG', timezone: 'Asia/Bishkek' },
  { name: 'Laos', code: 'LA', timezone: 'Asia/Vientiane' },
  { name: 'Latvia', code: 'LV', timezone: 'Europe/Riga' },
  { name: 'Lebanon', code: 'LB', timezone: 'Asia/Beirut' },
  { name: 'Lesotho', code: 'LS', timezone: 'Africa/Maseru' },
  { name: 'Liberia', code: 'LR', timezone: 'Africa/Monrovia' },
  { name: 'Libya', code: 'LY', timezone: 'Africa/Tripoli' },
  { name: 'Liechtenstein', code: 'LI', timezone: 'Europe/Vaduz' },
  { name: 'Lithuania', code: 'LT', timezone: 'Europe/Vilnius' },
  { name: 'Luxembourg', code: 'LU', timezone: 'Europe/Luxembourg' },
  { name: 'Madagascar', code: 'MG', timezone: 'Indian/Antananarivo' },
  { name: 'Malawi', code: 'MW', timezone: 'Africa/Blantyre' },
  { name: 'Malaysia', code: 'MY', timezone: 'Asia/Kuala_Lumpur' },
  { name: 'Maldives', code: 'MV', timezone: 'Indian/Maldives' },
  { name: 'Mali', code: 'ML', timezone: 'Africa/Bamako' },
  { name: 'Malta', code: 'MT', timezone: 'Europe/Malta' },
  { name: 'Marshall Islands', code: 'MH', timezone: 'Pacific/Majuro' },
  { name: 'Mauritania', code: 'MR', timezone: 'Africa/Nouakchott' },
  { name: 'Mauritius', code: 'MU', timezone: 'Indian/Mauritius' },
  { name: 'Mexico', code: 'MX', timezone: 'America/Mexico_City' }, // Add more like 'America/Tijuana', 'America/Monterrey'
  { name: 'Micronesia', code: 'FM', timezone: 'Pacific/Chuuk' },
  { name: 'Moldova', code: 'MD', timezone: 'Europe/Chisinau' },
  { name: 'Monaco', code: 'MC', timezone: 'Europe/Monaco' },
  { name: 'Mongolia', code: 'MN', timezone: 'Asia/Ulaanbaatar' }, // Add more like 'Asia/Hovd', 'Asia/Choibalsan'
  { name: 'Montenegro', code: 'ME', timezone: 'Europe/Podgorica' },
  { name: 'Morocco', code: 'MA', timezone: 'Africa/Casablanca' },
  { name: 'Mozambique', code: 'MZ', timezone: 'Africa/Maputo' },
  { name: 'Myanmar', code: 'MM', timezone: 'Asia/Yangon' },
  { name: 'Namibia', code: 'NA', timezone: 'Africa/Windhoek' },
  { name: 'Nauru', code: 'NR', timezone: 'Pacific/Nauru' },
  { name: 'Nepal', code: 'NP', timezone: 'Asia/Kathmandu' },
  { name: 'Netherlands', code: 'NL', timezone: 'Europe/Amsterdam' },
  { name: 'New Caledonia', code: 'NC', timezone: 'Pacific/Noumea' },
  { name: 'New Zealand', code: 'NZ', timezone: 'Pacific/Auckland' }, // Add more like 'Pacific/Chatham'
  { name: 'Nicaragua', code: 'NI', timezone: 'America/Managua' },
  { name: 'Niger', code: 'NE', timezone: 'Africa/Niamey' },
  { name: 'Nigeria', code: 'NG', timezone: 'Africa/Lagos' },
  { name: 'Niue', code: 'NU', timezone: 'Pacific/Niue' },
  { name: 'North Macedonia', code: 'MK', timezone: 'Europe/Skopje' },
  { name: 'Northern Mariana Islands', code: 'MP', timezone: 'Pacific/Saipan' },
  { name: 'Norway', code: 'NO', timezone: 'Europe/Oslo' },
  { name: 'Oman', code: 'OM', timezone: 'Asia/Muscat' },
  { name: 'Pakistan', code: 'PK', timezone: 'Asia/Karachi' },
  { name: 'Palau', code: 'PW', timezone: 'Pacific/Palau' },
  { name: 'Panama', code: 'PA', timezone: 'America/Panama' },
  { name: 'Papua New Guinea', code: 'PG', timezone: 'Pacific/Port_Moresby' },
  { name: 'Paraguay', code: 'PY', timezone: 'America/Asuncion' },
  { name: 'Peru', code: 'PE', timezone: 'America/Lima' },
  { name: 'Philippines', code: 'PH', timezone: 'Asia/Manila' },
  { name: 'Pitcairn', code: 'PN', timezone: 'Pacific/Pitcairn' },
  { name: 'Poland', code: 'PL', timezone: 'Europe/Warsaw' },
  { name: 'Portugal', code: 'PT', timezone: 'Europe/Lisbon' }, // Add more like 'Atlantic/Azores'
  { name: 'Puerto Rico', code: 'PR', timezone: 'America/Puerto_Rico' },
  { name: 'Qatar', code: 'QA', timezone: 'Asia/Qatar' },
  { name: 'Romania', code: 'RO', timezone: 'Europe/Bucharest' },
  { name: 'Russia', code: 'RU', timezone: 'Europe/Moscow' }, // Add more like 'Asia/Kamchatka', 'Asia/Yekaterinburg'
  { name: 'Rwanda', code: 'RW', timezone: 'Africa/Kigali' },
  { name: 'Saint Kitts and Nevis', code: 'KN', timezone: 'America/St_Kitts' },
  { name: 'Saint Lucia', code: 'LC', timezone: 'America/St_Lucia' },
  { name: 'Saint Vincent and the Grenadines', code: 'VC', timezone: 'America/St_Vincent' },
  { name: 'Samoa', code: 'WS', timezone: 'Pacific/Apia' },
  { name: 'San Marino', code: 'SM', timezone: 'Europe/San_Marino' },
  { name: 'Sao Tome and Principe', code: 'ST', timezone: 'Africa/Sao_Tome' },
  { name: 'Saudi Arabia', code: 'SA', timezone: 'Asia/Riyadh' },
  { name: 'Senegal', code: 'SN', timezone: 'Africa/Dakar' },
  { name: 'Serbia', code: 'RS', timezone: 'Europe/Belgrade' },
  { name: 'Seychelles', code: 'SC', timezone: 'Indian/Mahe' },
  { name: 'Sierra Leone', code: 'SL', timezone: 'Africa/Freetown' },
  { name: 'Singapore', code: 'SG', timezone: 'Asia/Singapore' },
  { name: 'Sint Maarten', code: 'SX', timezone: 'America/Phillipsburg' },
  { name: 'Slovakia', code: 'SK', timezone: 'Europe/Bratislava' },
  { name: 'Slovenia', code: 'SI', timezone: 'Europe/Ljubljana' },
  { name: 'Solomon Islands', code: 'SB', timezone: 'Pacific/Guadalcanal' },
  { name: 'Somalia', code: 'SO', timezone: 'Africa/Mogadishu' },
  { name: 'South Africa', code: 'ZA', timezone: 'Africa/Johannesburg' },
  { name: 'South Sudan', code: 'SS', timezone: 'Africa/Juba' },
  { name: 'Spain', code: 'ES', timezone: 'Europe/Madrid' }, // Add more like 'Africa/Ceuta'
  { name: 'Sri Lanka', code: 'LK', timezone: 'Asia/Colombo' },
  { name: 'Sudan', code: 'SD', timezone: 'Africa/Khartoum' },
  { name: 'Suriname', code: 'SR', timezone: 'America/Paramaribo' },
  { name: 'Sweden', code: 'SE', timezone: 'Europe/Stockholm' },
  { name: 'Switzerland', code: 'CH', timezone: 'Europe/Zurich' },
  { name: 'Syria', code: 'SY', timezone: 'Asia/Damascus' },
  { name: 'Taiwan', code: 'TW', timezone: 'Asia/Taipei' },
  { name: 'Tajikistan', code: 'TJ', timezone: 'Asia/Dushanbe' },
  { name: 'Tanzania', code: 'TZ', timezone: 'Africa/Dar_es_Salaam' },
  { name: 'Thailand', code: 'TH', timezone: 'Asia/Bangkok' },
  { name: 'Timor-Leste', code: 'TL', timezone: 'Asia/Dili' },
  { name: 'Togo', code: 'TG', timezone: 'Africa/Lome' },
  { name: 'Tonga', code: 'TO', timezone: 'Pacific/Tongatapu' },
  { name: 'Trinidad and Tobago', code: 'TT', timezone: 'America/Port_of_Spain' },
  { name: 'Tunisia', code: 'TN', timezone: 'Africa/Tunis' },
  { name: 'Turkey', code: 'TR', timezone: 'Europe/Istanbul' },
  { name: 'Turkmenistan', code: 'TM', timezone: 'Asia/Ashgabat' },
  { name: 'Tuvalu', code: 'TV', timezone: 'Pacific/Funafuti' },
  { name: 'Uganda', code: 'UG', timezone: 'Africa/Kampala' },
  { name: 'Ukraine', code: 'UA', timezone: 'Europe/Kiev' },
  { name: 'United Arab Emirates', code: 'AE', timezone: 'Asia/Dubai' },
  { name: 'United Kingdom', code: 'GB', timezone: 'Europe/London' },
  { name: 'United States', code: 'US', timezone: 'America/New_York' }, // Add more like 'America/Los_Angeles', 'America/Chicago'
  { name: 'Uruguay', code: 'UY', timezone: 'America/Montevideo' },
  { name: 'Uzbekistan', code: 'UZ', timezone: 'Asia/Tashkent' },
  { name: 'Vanuatu', code: 'VU', timezone: 'Pacific/Efate' },
  { name: 'Vatican City', code: 'VA', timezone: 'Europe/Vatican' },
  { name: 'Venezuela', code: 'VE', timezone: 'America/Caracas' },
  { name: 'Vietnam', code: 'VN', timezone: 'Asia/Ho_Chi_Minh' },
  { name: 'Western Sahara', code: 'EH', timezone: 'Africa/El_Aaiun' },
  { name: 'Yemen', code: 'YE', timezone: 'Asia/Aden' },
  { name: 'Zambia', code: 'ZM', timezone: 'Africa/Lusaka' },
  { name: 'Zimbabwe', code: 'ZW', timezone: 'Africa/Harare' }
];

// Nepali month and weekday mappings for Bikram Sambat
const nepaliMonths = [
  'बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 
  'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फाल्गुन', 'चैत्र'
];

const nepaliWeekdays = [
  'आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 
  'बिहिबार', 'शुक्रबार', 'शनिबार'
];

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCountry, setSelectedCountry] = useState('NP');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const getCurrentCountryTimezone = () => {
    const country = countries.find(c => c.code === selectedCountry);
    return country ? country.timezone : 'UTC';
  };

  const gregorianDate = currentTime.toISOString().split('T')[0];
  const bikramSambatDate = ADToBS(gregorianDate);

  // Extract Bikram Sambat components
  const [bsYear, bsMonth, bsDay] = bikramSambatDate.split('-').map(Number);
  const bsMonthName = nepaliMonths[bsMonth - 1];

  // Use currentTime to determine weekday index for Nepali weekdays
  const gregorianWeekdayIndex = currentTime.getDay(); // 0 (Sunday) to 6 (Saturday)
  const bsWeekday = nepaliWeekdays[gregorianWeekdayIndex];

  // Convert current time to selected country's timezone
  const countryTimezone = getCurrentCountryTimezone();
  const localTime = moment.tz(currentTime, countryTimezone);
  const formattedTime = localTime.format('hh:mm:ss A'); // Example: "02:30:45 PM"
  const [time, period] = formattedTime.split(' ');

  return (
    <>
      <label className='mb-3'>
        <select value={selectedCountry} onChange={handleCountryChange}>
          {countries.map(country => (
            <option key={country.code} value={country.code}>{country.name}</option>
          ))}
        </select>
      </label>
      <br />
      {selectedCountry === 'NP' ? (
        <>
          <strong className='title'>
            Bikram Sambat Date
          </strong>
          <span className='date'>{bsWeekday}, {bsMonthName} {bsDay}, {bsYear}</span>
          <strong className='title'>
            Time: <span className='time'>{time}</span> <span className='period'>{period}</span>
          </strong>
        </>
      ) : (
        <>
          <strong className='title'>
            Anno Domini Date
          </strong>
          <span className='date'>{localTime.format('dddd, MMMM Do YYYY')}</span>
          <strong className='title'>
            Time: <span className='time'>{time}</span> <span className='period'>{period}</span>
          </strong>
        </>
      )}
    </>
  );
};

export default CurrentTime;
