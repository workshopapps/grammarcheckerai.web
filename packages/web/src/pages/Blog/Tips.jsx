import React from 'react';
import Image3 from '../blogimg/image 2 (2).svg';
import Cta from '../Blogcomponents/Cta';

const Tips = () => {
  return (
    <section className="mb-10">
      <div className="mt-10 md:max-w-3xl md:mx-auto xl:max-w-5xl">
        <h1 className="text-header text-xl font-bold mb-4 text-center xl:text-3xl">
          10 Tips to Help You Speak English Like a Native
        </h1>
        <div className="text-header text-sm font-bold mb-4 text-center p-4">
          <span className="mr-3">Home</span>
          <span className="mr-3">&gt;&gt;&gt;</span>
          <span className="mr-3">Blog</span>
          <span className="mr-3">&gt;&gt;&gt;</span>
          <span className="text-blog">10 Tips to Help You Speak English Like a Native</span>
        </div>

        <div className="p-4 mb-10 md:w-full md:h-full md:mb-10">
          <img src={Image3} alt="improve your english speaking skills" className="w-full md:h-full" />
        </div>

        <div className="p-4 py-4">
          <p className="font-normal text-base mb-3">
            If you want to learn how to speak English like a native, you need to start with the basics. In this blog
            post, we will discuss 10 tips that will help you improve your speaking skills in a short amount of time!
            These tips are based on years of experience teaching English as a second language. Follow these tips and
            you'll be speaking like a pro in no time!
          </p>

          <p className="font-normal text-base mb-3">
            1. Listen to English podcasts - Listening to podcasts is a great way to get accustomed to proper
            pronunciation and natural dialogue in English. There are many free and paid options available, so find one
            that resonates with you and start listening. The main benefit of this exercise is that you'll get to hear
            how native English speakers talk and interact with each other.
          </p>

          <p className="font-normal text-base mb-3">
            2. Watch movies or TV shows in English - Watching movies or TV shows in their original language is a great
            way to get familiar with common phrases and conversation topics. Plus, it's entertaining at the same time.
            if you watch English movies, you will also get to experience different accents from all over the world.
          </p>

          <p className="font-normal text-base mb-3">
            3. Take an English course - Taking an English course or class can be a great way to learn the basics of
            grammar and pronunciation without having to study on your own. Look for courses that offer interactive
            activities so that you can practice speaking with others. The best way to find these courses is to look
            online or ask your friends and family.
          </p>

          <p className="font-normal text-base mb-3">
            4. Read books in English - Reading is a great way to learn new words and expressions. If possible, try to
            find books that are written for native English speakers. This way, you'll get used to the language at its
            most natural level. Read books that are interesting to you and don't be afraid to look up words you don't
            know.
          </p>
          <p className="font-normal text-base mb-3">
            5. Find an English-speaking partner - Having an English-speaking partner is a great way to practice your
            conversation skills. You can find partners through language exchange websites as well as apps like HelloTalk
            or WeSpeke. Make sure to set up regular meetings so that you can track your progress and stay motivated.
          </p>

          <p className="font-normal text-base mb-3">
            6. Try some tongue twisters - Tongue twisters are a great way to practice your pronunciation and
            articulation. Try saying some of the most famous ones like “She sells seashells by the seashore” or “Red
            leather, yellow leather”. The more you practice, the easier it will become!
          </p>

          <p className="font-normal text-base mb-3">
            7. Use English as much as possible - Make a conscious effort to use English in your everyday conversations.
            This will help you become more comfortable speaking the language and also give you practice with
            pronunciation and grammar. Even if you make mistakes, don't be afraid to keep trying!
          </p>

          <p className="font-normal text-base mb-3">
            8. Write in English - Writing is another great way to practice your language skills. Try writing short
            stories or emails in English. This will help you become more amiliar with the structure of sentences and
            build your confidence when speaking in English.
          </p>

          <p className="font-normal text-base mb-3">
            9. Memorize some key phrases - Memorizing key phrases is a great way to jumpstart conversations in English.
            These include commonly used phrases like “How are you?” or “Nice to meet you”. Knowing some of these phrases
            will make it easier for you to jump into conversations with native English speakers.
          </p>

          <p className="font-normal text-base mb-3">
            10. Download an app like the gritty grammar app: This is a great way to practice and test yourself on the
            go. The app has a variety of grammar, vocabulary, reading comprehension, and speaking exercises so you can
            fine-tune your skills in no time. Additionally, the app gives you questions that you get to answer and also
            provides feedback so you can see where you need to improve. So, grab your phone and start learning English
            with the gritty grammar app!
          </p>

          <p className="font-normal text-base mb-3">
            These are just a few suggestions for how to practice speaking English and improve in a short time. With a
            little bit of determination and hard work, you'll be an English-speaking pro in no time! Good luck!
          </p>
        </div>
      </div>
      <Cta />
    </section>
  );
};

export default Tips;
