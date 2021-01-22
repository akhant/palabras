export interface IWord {
  ru: string;
  es: string;
  wordId?: string;
  groupId?: string;
}

export interface IGroup {
  groupId?: string;
  groupName?: string;
  groupNameTranslation?: string;
  words?: IWord[];
}

export interface IWordsScreenProps {
  words?: IGroup[];
  getData?: any;
  groupId?: string;
  pageWords?: IWord[];
  addWord: (arg: IWord) => void;
}
