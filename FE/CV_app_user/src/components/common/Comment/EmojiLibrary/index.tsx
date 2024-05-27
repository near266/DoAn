import { Component } from 'react';
import { Emoji } from 'emoji-mart';

import { Helper } from '@/helpers';

export class EmojiLibrary extends Component<any> {
  render() {
    let result;

    const emoji = (
      <Emoji
        set="google"
        emoji={this.props.colon}
        size={22}
        backgroundImageFn={(set, sheetSize) => Helper.emojiUrl}
        fallback={(emoji, props) => {
          return emoji ? `:${emoji.short_names[0]}:` : props.emoji;
        }}
      />
    );
    if (emoji) {
      result = emoji;
    } else {
      result = this.props.colon;
    }

    return (
      <span
        style={{
          display: 'inline-flex',
          verticalAlign: 'text-bottom',
          position: 'relative',
        }}
      >
        {result}
        <span
          dir="auto"
          style={{
            position: 'absolute',
            display: 'inline',
            flexGrow: 0,
            flexShrink: 0,
            overflow: 'hidden',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
            color: 'rgba(0, 0, 0, 0)',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            userSelect: 'text',
            cursor: 'text',
            width: '22px',
            height: '5px',
            bottom: 0,
          }}
        >
          {this.props.colon}
        </span>
      </span>
    );
  }
}

export default EmojiLibrary;
