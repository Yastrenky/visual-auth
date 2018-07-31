const format = {
  date: (date) => {
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();

    let h = date.getHours();

    let hf = (h > 11) ? 'PM' : 'AM';
    let hh = (h > 12) ? h%12 : h;
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    if(d<10)d='0'+d;
    if(m<10)m='0'+m;
    if(hh<10)hh='0'+hh;
    if(mm<10)mm='0'+mm;
    if(ss<10)ss='0'+ss;

    return {date: m+'/'+d+'/'+y, time:hh+':'+mm+':'+ss+' '+hf};
  },
  int:  n => Number(n.replace(/\D/g, '')),
  percent: p => {
    let n = Number(p.replace(/[^\d.]/g, '')); 
    
    return (!n || n < 0) ? 0 : n > 100 ? 100 : n % 1 === 0 ? n : n.toFixed(1);
  },
  phone:   p => p.replace(/\D/g, '').replace(/(^\d{3})(\d{3})(\d{4})(\d*)/,(m,a,b,c,d)=>'('+a+') '+b+' - '+c+(d ? ' - '+d : '')),
  name:    s => s.replace(/^\s+/, '').replace(/\s{2,}/g, ' ').split(' ').map((n)=>n.charAt(0).toUpperCase() + n.slice(1)).join(' '),
  first:   s => s.charAt(0).toUpperCase() + s.slice(1),
  search:  s => s.replace(/[^\w\s]/gi, (m, a)=>'\\'+m),
  money:   s => s.replace(/\D/g, '').replace(/[\d]{1,2}$/, m =>'.'+m).replace(/^\d*/, m=>+m) || '',
  url:     s => s.toLowerCase().trim().replace(/\s+/g,'_'),
  string:  s => s.replace(/[^\w\s]/g, ''),
  letters: s => s.replace(/[^a-zA-Z ]/gi, ''),
  expdate: s => {

    return s.replace(/\D/g, '').replace(/(\d{1,2})(\d+)?/, (m, mm, yy) => {
      let month, year;

      // console.log(m, mm, yy);

      if ( (Number(mm) > 1 && Number(mm) < 10)) {
        month = '0' + mm.replace(/^0/, '');
      }
      else {
        month = mm;
      }

      year = yy ? ' / ' + yy.substring(0, 2) : '';

      return month + year;
    }
  )}
}

export default format;
