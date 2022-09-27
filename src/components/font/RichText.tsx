import React, { Fragment, useMemo } from 'react';
import { pipe } from 'fp-ts/function';
import { isDefined } from '../../helpers/nullable';

type Props = {
  children: string;
};

type Transformer = {
  regexp: string;
  component: (args: string[])=> React.ReactNode;
  transformRegexp: (text: string)=> string[];
}

const transformers: Transformer[] = [
  {
    regexp: '!\\[.*\\]\\(https?://[^ ]+\\)',
    component: ([alt, url]: string[]) => <img alt={alt} src={`${url}`} className="max-w-full max-h-full" />,
    transformRegexp: (text: string) => text
      .split('](')
      .map(a => a
          .replace(/^!\[/g, '')
          .replace(/\)$/g, '')
      ),
  },{
    regexp: 'https?://[^ ]+',
    component: ([text]: string[]) => <a href={`${text}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{text}</a>,
    transformRegexp: (text: string) => [text],
  }, {
    regexp: '\\*\\*\\*.+?\\*\\*\\*',
    component: ([text]: string[]) => <strong><i>{transformText(text)}</i></strong>,
    transformRegexp: (text: string) => [text.replaceAll('***', '')],
  }, {
    regexp: '\\*\\*.+?\\*\\*',
    component: ([text]: string[]) => <strong>{transformText(text)}</strong>,
    transformRegexp: (text: string) => [text.replaceAll('**', '')],
  }, {
    regexp: '\\*.+?\\*',
    component: ([text]: string[]) => <i>{transformText(text)}</i>,
    transformRegexp: (text: string) => [text.replaceAll('*', '')],
  }
];

const transformText = (text: string): React.ReactNode => (
  text
    .split(new RegExp(transformers.map(({regexp}) => `(${regexp})`).join('|'), 'g'))
    .filter(isDefined)
    .map((splitted, index) => {
      const matchingTransformers = transformers.filter(({regexp}) => splitted.match(new RegExp(`^${regexp}$`, 'g')));

      return (
        <Fragment key={`${index}`}>
          {
            matchingTransformers.length > 0
              ? pipe(
                splitted,
                matchingTransformers[0].transformRegexp,
                matchingTransformers[0].component,
              )
              : splitted
          }
        </Fragment>
      )
    })
);

export function RichText({children}: Props ) {
  const content = useMemo(() => transformText(children), [children]);

  return (<>{content}</>)
}