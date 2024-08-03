import babyPicture from "../../assets/1999-XX-XX Mark baby picture.jpg";
import pizzaBoxArmor from "../../assets/20XX-XX-XX pizza box armor.jpg";
import forensicsTrophyPose from "../../assets/2014-XX-XX forensics trophy pose.png";
import profilePicture2020 from "../../assets/2020-02-01 profile picture blue shirt green background.jpg";
import "./About.css";
import { LargeTitle, Link } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";

const About = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className="aboutContainer">
      <Link
        as="a"
        onClick={() => {
          navigate("/");
        }}
        style={{ textAlign: "center", fontSize: "18px" }}
      >
        Home
      </Link>
      <LargeTitle
        as="h1"
        style={{
          textAlign: "center",
          marginBottom: ".2em",
          hyphens: "auto",
        }}
      >
        Who am I, anyway? A 5-minute autobiography
      </LargeTitle>
      <p style={{ fontWeight: "bold" }}>
        In which your author divulges too much (and also not enough) personal
        information in the hopes of better connecting with you, his audience
      </p>
      <p>
        {/* todo ExternalLink component */}
        Originally posted at{" "}
        <Link
          href="https://markwiemer.medium.com/who-am-i-anyway-a-5-minute-autobiography-f46fb3e6ead4"
          target="_blank"
          rel="noreferrer"
        >
          markwiemer
          <wbr />
          .medium
          <wbr />
          .com
        </Link>{" "}
        on 2023-04-17
      </p>
      <img src={babyPicture} alt="Me as a cute baby"></img>
      <p>
        I was born with half a heart shortly before the turn of the millennium
        near Milwaukee, WI, USA, Earth. My childhood in a loving home with
        loving parents and three siblings was uneventful - I spent most of my
        time reading, writing fantasy books, playing with friends and with Hot
        Wheels cars, and generally just imagining. We were raised Catholic, and
        I went to a private school until we moved to the suburbs when I was
        about 9. From there, I continued my merry life of making armor out of
        pizza boxes and accidentally injuring myself. I even started playing
        Minecraft.
      </p>
      <img src={pizzaBoxArmor} alt="Me showing off my pizza box armor"></img>
      <p>
        (She&apos;s been emojified because she&apos;s not the main character.
        Also, privacy)
      </p>
      <hr />
      <p>
        A few years after I accidentally hit myself in the back of the head with
        an axe, I became a high schooler. In between, I was hit by a major bout
        of depression that plagues me to this day. I have struggled with many
        episodes of suicidality, but with help from the aforementioned family,
        the friends I made along the way, and caring teachers and counselors,
        I&apos;ve learned how to cope (and take daily anti-depressants).
        Otherwise, high school continued like most school: Easy, engaging,
        boring, and full of socialization.
      </p>
      <p>
        When high school began, so did my software career. When I sat down to
        learn Visual Basic, I thought I&apos;d be typing 1s and 0s into a green
        terminal - I was never more shocked than when I learned we could write
        code with regular words.
      </p>
      <img
        src={forensicsTrophyPose}
        alt="Me posing with my high school forensics trophy"
      ></img>
      <hr />
      <p>
        After the girl I loved found someone else, your 16-year-old author
        started dating someone who ended up raping him. That was not fun. We
        broke up.
      </p>
      <hr />
      <p>
        Before the breakup, though, I started my &quot;volunteer career&quot; as
        a camp counselor. Turning Rivers will forever hold a special place in my
        heart. The amazing work that program does for so many kids is beyond
        magical. I am incredibly thankful for their presence in this world.
        Unfortunately, with The Pandemic That Shall Not Be Named and my move
        across the country, this &quot;career&quot; was paused after just a few
        years.
      </p>
      <hr />
      <p>
        I went through college as most other students did. My magic super brain
        gave me good grades, I socialized plenty but rarely drank, I developed
        PTSD from the aforementioned sexual assaults (and some not-mentioned
        sexual assaults in college), I built my own apps, and I read about the
        FIRE movement (though I&apos;ve never identified with it). Just your
        average college experience. My mom says I dated around* but I maintain I
        dated asquare. Heh. Moving on.
      </p>
      <p>
        I knew going into college I would be a software engineer (or industrial
        engineer, or maybe something else), but it took a few months to realize
        I loved teaching. Education became my goal, and I&apos;m still exploring
        more ways to deliver that - with code, with articles, with guidance for
        teachers and delivering my own lectures to students. This blog has
        become a great first step. Thank you for reading. Throughout college I
        was a math tutor, computer science teaching assistant, and coding club
        leader - all of which were immensely rewarding.
      </p>
      <p>
        *OK, she said &quot;I dated a lot of girls,&quot; but that doesn&apos;t
        lend itself as well to my pun.
      </p>
      <hr />
      <p>
        I studied abroad in France. I speak French. Kinda. It&apos;s kind of a
        big deal. Kinda. But less importantly, my host mom verbally abused me
        and I developed a fear of roommates that I didn&apos;t get over until I
        moved to the West Coast of the United States and didn&apos;t have
        roommates. Oh and I climbed a mountain a few times while I was there. In
        France, that is.
      </p>
      <hr />
      <p>
        I also learned some things in college. My Catholic upbringing and
        awesome parents instilled a strong moral sense in me, and after some
        philosophy and ethics courses I resolved to just plain not deceive
        people. I think that&apos;s wrong. I&apos;m not sure why other people do
        that. It&apos;s not cool.
      </p>
      <p>
        I tried to learn why other people do that by studying the brain -
        biology, neurophysiology, psychology, sociology, all that fun stuff. No
        luck, unfortunately, but I now know a bunch of cool Latin words for
        brain parts. Or, well, I did. I&apos;m sure my flash cards are somewhere
        around here…
      </p>
      <p>
        Most important, of course, was making friends with a wonderful young
        woman who was a photographer, as it turned out, and getting this great
        headshot for free:
      </p>
      <img
        src={profilePicture2020}
        alt="Me, looking professional in February 2020"
      ></img>
      <p>
        I like this shirt because it&apos;s full of equal signs. It covers my
        love of math and social justice! 🤓
      </p>
      <hr />
      <p>
        I now live on the aforementioned Coast in or around Seattle, working for
        Microsoft, rock climbing when I can, and doing my best to avoid video
        games. For over a year, I&apos;ve spent more on charity then I&apos;ve
        spent on myself - no one should starve - but this may not be
        sustainable. I eat the same dish of tofu with peanut sauce and
        vegetables nearly every day for some reason, and it wasn&apos;t until
        February of this year that I got into AI.
      </p>
      <p>
        In late 2021, I suffered a major mental breakdown from depression and
        took two months off work to recover. During that time I developed a
        renewed faith in God that I&apos;m still exploring. I go to a Bible
        study of sorts about every week with a bunch of old Catholic men
        (including my dad), and I&apos;ve learned a lot from them, from my
        family, and from my personal studies.
      </p>
      <p>
        Lastly, I&apos;m honored to be a Big Brother through BBBS. I&apos;ve
        been matched with my Little for over 2 years now and I love playing
        Magic and Minecraft, watching movies, and just talking about life with
        him. He&apos;s the best.
      </p>
      <hr />
      <p>
        I hope this helped you understand the person behind the words a bit
        better. Remember that every article you read and interaction you have is
        attached to a story - a person - just like this, except a lot different.
        Isn&apos;t that amazing? I think it&apos;s pretty neat.
      </p>
    </div>
  );
};

export default About;
