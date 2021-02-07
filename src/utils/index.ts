import {URL_VERB} from './../redux/const/index';
import {IForm, IGroup, IWord} from './../interfaces/index';
import cheerio from 'cheerio';
import axios from 'axios';

export const generateNewWord = (words: IGroup[], category: string) => {
  if (!words?.length) return {ru: '', es: ''};
  let word: IWord;
  if (category === 'ALL') {
    let maxGroupElement = words.length - 1;
    let randomGroupNumber = Math.round(Math.random() * maxGroupElement);

    //@ts-ignore
    let maxWordElement = words[randomGroupNumber].words.length - 1;

    word =
      //@ts-ignore
      words[randomGroupNumber].words[
        Math.round(Math.random() * maxWordElement)
      ];
    return word;
  } else {
    let categoryWords: IWord[] = [];

    //find the category
    for (let group of words) {
      if (group.groupId === category) {
        //@ts-ignore
        categoryWords = group.words;
        break;
      }
    }
    const maxCategoryElement = categoryWords.length - 1;

    word = categoryWords[Math.round(Math.random() * maxCategoryElement)];
    return word;
  }
};

export const fetchAndParseVerb = async (word: IWord) => {
  let data;
  let result: IForm = {
    infinitivo: '',
    gerundio: '',
    participio: '',
    indicativo: {
      presente: {
        yo: '',
        tu: '',
        el: '',
        nosotros: '',
        vosotros: '',
        ellos: '',
      },
      futuro: {
        yo: '',
        tu: '',
        el: '',
        nosotros: '',
        vosotros: '',
        ellos: '',
      },
      futuroPerf: {
        yo: '',
        tu: '',
        el: '',
        nosotros: '',
        vosotros: '',
        ellos: '',
      },
      preteritoPerf: {
        yo: '',
        tu: '',
        el: '',
        nosotros: '',
        vosotros: '',
        ellos: '',
      },
      preteritoImp: {
        yo: '',
        tu: '',
        el: '',
        nosotros: '',
        vosotros: '',
        ellos: '',
      },
      preteritoPerfComp: {
        yo: '',
        tu: '',
        el: '',
        nosotros: '',
        vosotros: '',
        ellos: '',
      },
      preteritoPlus: {
        yo: '',
        tu: '',
        el: '',
        nosotros: '',
        vosotros: '',
        ellos: '',
      },
      preteritoAnt: {
        yo: '',
        tu: '',
        el: '',
        nosotros: '',
        vosotros: '',
        ellos: '',
      },
    },
    subjuntivo: {
      presente: {
        yo: '',
        tu: '',
        el: '',
        nosotros: '',
        vosotros: '',
        ellos: '',
      },
      futuro: {
        yo: '',
        tu: '',
        el: '',
        nosotros: '',
        vosotros: '',
        ellos: '',
      },
      futuroPerf: {
        yo: '',
        tu: '',
        el: '',
        nosotros: '',
        vosotros: '',
        ellos: '',
      },
      preteritoImp: {
        yo: '',
        tu: '',
        el: '',
        nosotros: '',
        vosotros: '',
        ellos: '',
      },
      preteritoImp2: {
        yo: '',
        tu: '',
        el: '',
        nosotros: '',
        vosotros: '',
        ellos: '',
      },
      preteritoPerfComp: {
        yo: '',
        tu: '',
        el: '',
        nosotros: '',
        vosotros: '',
        ellos: '',
      },
      preteritoPlus: {
        yo: '',
        tu: '',
        el: '',
        nosotros: '',
        vosotros: '',
        ellos: '',
      },
      preteritoPlus2: {
        yo: '',
        tu: '',
        el: '',
        nosotros: '',
        vosotros: '',
        ellos: '',
      },
    },
    imperativo: {
      tu: '',
      el: '',
      nosotros: '',
      vosotros: '',
      ellos: '',
    },
    conditional: {
      yo: '',
      tu: '',
      el: '',
      nosotros: '',
      vosotros: '',
      ellos: '',
    },
    conditionalPerf: {
      yo: '',
      tu: '',
      el: '',
      nosotros: '',
      vosotros: '',
      ellos: '',
    },
  };
  let fullWord = {word, form: result, formData: false};

  try {
    const res = await axios.get(`${URL_VERB}${encodeURI(word.es)}`);
    data = res.data;
  } catch (err) {
    return fullWord;
  }

  let $ = cheerio.load(data);

  let found = $('#formas-simples td').text();
  let arr = found
    .split('\n')
    .map((item: string) => item.trim())
    .filter((item: string) => item !== '');
  //           0       1          2    3      4                                                                                           15               17                                                                                 27                                                                                                                                              30         31          33                                                                                                            46                                                                                               56                                                                                                                                                                       59                                            63                                                                                     73               75                                                                                   85                                    88                       91                                                                                                                                         104     105                           108                                                                                      118
  // ["Infinitivo","hacer","Presente","yo","hago","tú","haces","él","hace","nosotros","hacemos","vosotros","hacéis","ellos","hacen","Presente subj.","yo","haga","tú","hagas","él","haga","nosotros","hagamos","vosotros","hagáis","ellos","hagan","haceryohagotúhacesélhacenosotroshacemosvosotroshacéiselloshacenyohagatúhagasélhaganosotroshagamosvosotroshagáiselloshagan","Gerundio","haciendo","Futuro","yo","haré","tú","harás","él","hará","nosotros","haremos","vosotros","haréis","ellos","harán","Futuro subj.","yo","hiciere","tú","hicieres","él","hiciere","nosotros","hiciéremos","vosotros","hiciereis","ellos","hicieren","haciendoyoharétúharásélharánosotrosharemosvosotrosharéisellosharányohicieretúhicieresélhicierenosotroshiciéremosvosotroshiciereiselloshicieren","Participio","hecho","Pretérito imp.","Pretérito perf.","yo","hice","tú","hiciste","él","hizo","nosotros","hicimos","vosotros","hicisteis","ellos","hicieron","yo","hacía","tú","hacías","él","hacía","nosotros","hacíamos","vosotros","hacíais","ellos","hacían","Preterito imp. subj.","yo","hiciera","hiciese","tú","hicieras","hicieses","él","hiciera","hiciese","nosotros","hiciéramos","hiciésemos","vosotros","hicierais","hicieseis","ellos","hicieran","hiciesen","hecho","Pretérito perf.","yo","hice","tú","hiciste","él","hizo","nosotros","hicimos","vosotros","hicisteis","ellos","hicieron","yohicetúhicisteélhizonosotroshicimosvosotroshicisteiselloshicieronyohacíatúhacíasélhacíanosotroshacíamosvosotroshacíaiselloshacíanyohicierahiciesetúhicierashiciesesélhicierahiciesenosotroshiciéramoshiciésemosvosotroshicieraishicieseiselloshicieranhiciesen"]
  result.infinitivo = arr[1];
  result.gerundio = arr[30];
  result.participio = arr[59];
  //presente
  result.indicativo.presente.yo = arr[4];
  result.indicativo.presente.tu = arr[6];
  result.indicativo.presente.el = arr[8];
  result.indicativo.presente.nosotros = arr[10];
  result.indicativo.presente.vosotros = arr[12];
  result.indicativo.presente.ellos = arr[14];
  // presente subj
  result.subjuntivo.presente.yo = arr[17];
  result.subjuntivo.presente.tu = arr[19];
  result.subjuntivo.presente.el = arr[21];
  result.subjuntivo.presente.nosotros = arr[23];
  result.subjuntivo.presente.vosotros = arr[25];
  result.subjuntivo.presente.ellos = arr[27];
  //futuro
  result.indicativo.futuro.yo = arr[33];
  result.indicativo.futuro.tu = arr[35];
  result.indicativo.futuro.el = arr[37];
  result.indicativo.futuro.nosotros = arr[39];
  result.indicativo.futuro.vosotros = arr[41];
  result.indicativo.futuro.ellos = arr[43];
  //futuro subj
  result.subjuntivo.futuro.yo = arr[46];
  result.subjuntivo.futuro.tu = arr[48];
  result.subjuntivo.futuro.el = arr[50];
  result.subjuntivo.futuro.nosotros = arr[52];
  result.subjuntivo.futuro.vosotros = arr[54];
  result.subjuntivo.futuro.ellos = arr[56];
  //preterito perf
  result.indicativo.preteritoPerf.yo = arr[63];
  result.indicativo.preteritoPerf.tu = arr[65];
  result.indicativo.preteritoPerf.el = arr[67];
  result.indicativo.preteritoPerf.nosotros = arr[69];
  result.indicativo.preteritoPerf.vosotros = arr[71];
  result.indicativo.preteritoPerf.ellos = arr[73];
  //preterito imp
  result.indicativo.preteritoImp.yo = arr[75];
  result.indicativo.preteritoImp.tu = arr[77];
  result.indicativo.preteritoImp.el = arr[79];
  result.indicativo.preteritoImp.nosotros = arr[81];
  result.indicativo.preteritoImp.vosotros = arr[83];
  result.indicativo.preteritoImp.ellos = arr[85];
  //preterito imperfecto subj
  result.subjuntivo.preteritoImp.yo = arr[88];
  result.subjuntivo.preteritoImp.tu = arr[91];
  result.subjuntivo.preteritoImp.el = arr[94];
  result.subjuntivo.preteritoImp.nosotros = arr[97];
  result.subjuntivo.preteritoImp.vosotros = arr[100];
  result.subjuntivo.preteritoImp.ellos = arr[103];
  //preterito imperfecto subj2
  result.subjuntivo.preteritoImp2.yo = arr[89];
  result.subjuntivo.preteritoImp2.tu = arr[92];
  result.subjuntivo.preteritoImp2.el = arr[95];
  result.subjuntivo.preteritoImp2.nosotros = arr[98];
  result.subjuntivo.preteritoImp2.vosotros = arr[101];
  result.subjuntivo.preteritoImp2.ellos = arr[104];

  found = $('#otras-formas td').text();
  arr = found
    .split('\n')
    .map((item: string) => item.trim())
    .filter((item: string) => item !== '');

  //imperativo
  result.imperativo.tu = arr[2];
  result.imperativo.el = arr[4];
  result.imperativo.nosotros = arr[6];
  result.imperativo.vosotros = arr[8];
  result.imperativo.ellos = arr[10];
  //conditional
  result.conditional.yo = arr[14];
  result.conditional.tu = arr[16];
  result.conditional.el = arr[18];
  result.conditional.nosotros = arr[20];
  result.conditional.vosotros = arr[22];
  result.conditional.ellos = arr[24];
  //conditional perfecto
  result.conditionalPerf.yo = arr[28];
  result.conditionalPerf.tu = arr[30];
  result.conditionalPerf.el = arr[32];
  result.conditionalPerf.nosotros = arr[34];
  result.conditionalPerf.vosotros = arr[36];
  result.conditionalPerf.ellos = arr[38];

  found = $('#formas-compuestas td').text();
  arr = found
    .split('\n')
    .map((item: string) => item.trim())
    .filter((item: string) => item !== '');

  // preterito perfecto comp
  result.indicativo.preteritoPerfComp.yo = arr[2];
  result.indicativo.preteritoPerfComp.tu = arr[4];
  result.indicativo.preteritoPerfComp.el = arr[6];
  result.indicativo.preteritoPerfComp.nosotros = arr[8];
  result.indicativo.preteritoPerfComp.vosotros = arr[10];
  result.indicativo.preteritoPerfComp.ellos = arr[12];
  // preterito perfecto comp subj
  result.subjuntivo.preteritoPerfComp.yo = arr[15];
  result.subjuntivo.preteritoPerfComp.tu = arr[17];
  result.subjuntivo.preteritoPerfComp.el = arr[19];
  result.subjuntivo.preteritoPerfComp.nosotros = arr[21];
  result.subjuntivo.preteritoPerfComp.vosotros = arr[23];
  result.subjuntivo.preteritoPerfComp.ellos = arr[25];
  // futuro perfecto
  result.indicativo.futuroPerf.yo = arr[29];
  result.indicativo.futuroPerf.tu = arr[31];
  result.indicativo.futuroPerf.el = arr[33];
  result.indicativo.futuroPerf.nosotros = arr[35];
  result.indicativo.futuroPerf.vosotros = arr[37];
  result.indicativo.futuroPerf.ellos = arr[39];
  // futuro perfecto subj
  result.subjuntivo.futuroPerf.yo = arr[42];
  result.subjuntivo.futuroPerf.tu = arr[44];
  result.subjuntivo.futuroPerf.el = arr[46];
  result.subjuntivo.futuroPerf.nosotros = arr[48];
  result.subjuntivo.futuroPerf.vosotros = arr[50];
  result.subjuntivo.futuroPerf.ellos = arr[52];
  // preterito anterior
  result.indicativo.preteritoAnt.yo = arr[57];
  result.indicativo.preteritoAnt.tu = arr[59];
  result.indicativo.preteritoAnt.el = arr[61];
  result.indicativo.preteritoAnt.nosotros = arr[63];
  result.indicativo.preteritoAnt.vosotros = arr[65];
  result.indicativo.preteritoAnt.ellos = arr[67];
  // preterito plus
  result.indicativo.preteritoPlus.yo = arr[69];
  result.indicativo.preteritoPlus.tu = arr[71];
  result.indicativo.preteritoPlus.el = arr[73];
  result.indicativo.preteritoPlus.nosotros = arr[75];
  result.indicativo.preteritoPlus.vosotros = arr[77];
  result.indicativo.preteritoPlus.ellos = arr[79];
  // preterito pluscuamperfecto
  result.subjuntivo.preteritoPlus.yo = arr[82];
  result.subjuntivo.preteritoPlus.tu = arr[85];
  result.subjuntivo.preteritoPlus.el = arr[88];
  result.subjuntivo.preteritoPlus.nosotros = arr[91];
  result.subjuntivo.preteritoPlus.vosotros = arr[94];
  result.subjuntivo.preteritoPlus.ellos = arr[97];
  // preterito pluscuamperfecto2
  result.subjuntivo.preteritoPlus2.yo = arr[83];
  result.subjuntivo.preteritoPlus2.tu = arr[86];
  result.subjuntivo.preteritoPlus2.el = arr[89];
  result.subjuntivo.preteritoPlus2.nosotros = arr[92];
  result.subjuntivo.preteritoPlus2.vosotros = arr[95];
  result.subjuntivo.preteritoPlus2.ellos = arr[98];
  if (
    result.indicativo?.presente?.yo &&
    result.subjuntivo?.presente?.yo &&
    result.infinitivo
  ) {
    fullWord.formData = true;
    fullWord.form = result;
  }

  return fullWord;
};

export const renderFullTimeName = (time: string, subj: boolean = false) => {
  if (subj) {
    switch (time) {
      case 'presente':
        return 'Presente subjuntivo';
      case 'futuro':
        return 'Futuro subjuntivo';
      case 'futuroPerf':
        return 'Futuro perfecto subjuntivo';
      case 'preteritoImp':
        return 'Preterito imperfecto subjuntivo';
      case 'preteritoPerfComp':
        return 'Preterito perfecto compuesto subjuntivo';
      case 'preteritoPlus':
        return 'Preterito pluscuamperfecto subjuntivo';
      case 'preteritoPlus2':
        return 'Preterito pluscuamperfecto2 subjuntivo';
      case 'preteritoImp2':
        return 'Preterito imperfecto 2 subjuntivo ';
      default:
        return 'no data';
    }
  } else {
    switch (time) {
      case 'presente':
        return 'Presente';
      case 'futuro':
        return 'Futuro';
      case 'futuroPerf':
        return 'Futuro perfecto';
      case 'preteritoImp':
        return 'Preterito imperfecto';
      case 'preteritoPerf':
        return 'Preterito perfecto';
      case 'preteritoPerfComp':
        return 'Preterito perfecto compuesto';
      case 'preteritoPlus':
        return 'Preterito pluscuamperfecto';
      case 'preteritoAnt':
        return 'Preterito anterior';
      case 'imperativo':
        return 'Imperativo';
      case 'gerundio':
        return 'Gerundio';
      case 'participio':
        return 'Participio';
      case 'infinitivo':
        return 'Infinitivo';
      case 'conditional':
        return 'Conditional';
      case 'conditionalPerf':
        return 'Conditional perfecto';

      default:
        return 'no data';
    }
  }
};
