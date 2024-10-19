import { LargeTitle, makeStyles } from '@fluentui/react-components';
import profile2023 from '../../assets/2023-07-20 profile.png';
import wynonnaRaincoat from '../../assets/2024-04-29 Wynonna raincoat outside.jpg';
import useAppStyles from '../../App.styles';
import Emoji from '../../components/Emoji';
import ExternalLink from '../../components/ExternalLink';
import InternalLink from '../../components/InternalLink';

const headerImageSize = '12em';
const useHomeStyles = makeStyles({
    mainText: { padding: '2em' },
    headerImage: { width: headerImageSize, height: headerImageSize },
});

const HomePage = (): JSX.Element => {
    const homeStyles = useHomeStyles();
    const appStyles = useAppStyles();

    return (
        <div className={appStyles.article}>
            <LargeTitle as="h1" style={{ textAlign: 'center' }}>
                mark
                <wbr />
                wiemer
                <wbr />
                .com
            </LargeTitle>
            <div
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: '1em',
                    rowGap: '1em',
                    alignSelf: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                }}
            >
                <img src={profile2023} className={homeStyles.headerImage} />
                <img src={wynonnaRaincoat} className={homeStyles.headerImage} />
            </div>
            <div className={homeStyles.mainText}>
                <p>
                    Hello, world! If you're reading this, it's because you're a
                    cool person. There isn't much here yet, just wanted to show
                    you my little corner of the internet. I'll let you know when
                    there's more to see :{')'}
                </p>
                <p>
                    P.S. I'm the human in the above photos. The cute dog is
                    Wynonna, my Australian shepherd <Emoji emoji="🥰" />
                </p>
                <p>
                    (Emojis rendered in{' '}
                    <ExternalLink href="https://fonts.google.com/noto/specimen/Noto+Color+Emoji">
                        Noto Color Emoji
                    </ExternalLink>
                    )
                </p>
                <div
                    style={{
                        flexDirection: 'row',
                        columnGap: '1em',
                        rowGap: '1em',
                        alignSelf: 'center',
                        alignItems: 'center',
                    }}
                >
                    <InternalLink href="/blog/about" text="About me" />|
                    <InternalLink href="/blog" text="Blog" />|
                    <ExternalLink href="https://github.com/mark-wiemer/mark-wiemer-com">
                        View on GitHub
                    </ExternalLink>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
