export interface IWord {
  ru: string;
  es: string;
  wordId: string;
  groupId?: string;
}

export interface IGroup {
  groupId: string;
  groupName: string;
  groupNameTranslation: string;
  words?: IWord[];
}

export interface IWordsScreenProps {
  words: IGroup[];
  getData?: any;
  groupId?: string;
  pageWords?: IWord[];
  addWord: (arg: IWord) => void;
  removeWord: (wordId: string, groupId: string) => void;
  getVerbData: (wordId: string) => void;
  data?: any;
  verb: any;
}

export interface ICheckScreenProps {
  words: IGroup[];
  data: any;
  navigation: any;
}

export interface IVerbForm {
  yo?: string;
  tu: string;
  el: string;
  nosotros: string;
  vosotros: string;
  ellos: string;
}

export interface IIndicativo {
  presente: IVerbForm;
  futuro: IVerbForm;
  futuroPerf: IVerbForm;
  preteritoPerf: IVerbForm;
  preteritoPerfComp: IVerbForm;
  preteritoPlus: IVerbForm;
  preteritoAnt: IVerbForm;
  preteritoImp: IVerbForm;
}

export interface ISubjuntivo {
  presente: IVerbForm;
  futuro: IVerbForm;
  preteritoImp: IVerbForm;
  futuroPerf: IVerbForm;
  preteritoPerfComp: IVerbForm;
  preteritoPlus: IVerbForm;
  preteritoImp2: IVerbForm;
  preteritoPlus2: IVerbForm;
}

export interface IForm {
  //fix ts forin cycle in WordsScreen
  [key: string]: any;
  infinitivo: string;
  gerundio: string;
  participio: string;
  indicativo: IIndicativo;
  subjuntivo: ISubjuntivo;
  imperativo: IVerbForm;
  conditional: IVerbForm;
  conditionalPerf: IVerbForm;
}

export interface IVerb {
  word: IWord;
  form?: IForm;
  formData: boolean;
}
