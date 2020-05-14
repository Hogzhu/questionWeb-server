import Article from '../../../../../model/article';

export default interface AdminState {
  articleTotal: number;
  articleList: Article[];
  article?: Article;
  account: number;
  identity: string;
  userDone: number;
  userSolved: number;
  questionNum: number;
}