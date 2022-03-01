import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { NextPageContext } from 'next';
import { RenderPage } from 'next/dist/shared/lib/utils';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: NextPageContext & {
      renderPage: RenderPage;
      defaultGetInitialProps(
        ctx: DocumentContext,
      ): Promise<DocumentInitialProps>;
    },
  ) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
            rel="stylesheet"
          />
          <title>ゴロゴロ円周率</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
