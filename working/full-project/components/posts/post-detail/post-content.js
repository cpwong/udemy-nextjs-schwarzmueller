import Image from "next/legacy/image";
import Markdown from 'react-markdown';
import styles from './post-content.module.css';
import PostHeader from './post-header';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import coldarkDark from 'react-syntax-highlighter/dist/cjs/styles/prism/coldark-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

export default function PostContent({ post }) {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  return (
    <article className={styles.content}>
      <PostHeader title={post.title} image={imagePath} />
      <Markdown
        components={{
          img: img => {
            console.log('Markdown img: ',img);
            return (
              <Image 
                src={`/images/posts/${post.slug}/${img.src}`}
                alt={img.alt}
                width={600}
                height={300}
              />
            );
          },
          code: code => {
            return (
              <SyntaxHighlighter 
                language={code.className.split('-')[1] }
                style={coldarkDark}
              >
                {code.children}
              </SyntaxHighlighter>
            )
          }
        }}
      >
        {post.content}
      </Markdown>     
    </article>
  )
}
