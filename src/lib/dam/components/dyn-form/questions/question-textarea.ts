import { QuestionBase } from './question-base';

export class TextAreaQuestion extends QuestionBase<string> {
  controlType = 'text-area';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
