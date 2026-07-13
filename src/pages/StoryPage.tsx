import { MediaPlaceholder } from "../components/shared/MediaPlaceholder";
import { MemorialContent } from "../types/memorial";

const biographySections = [
  {
    title: "Early Years",
    paragraphs: [
      "Our dearly beloved Ugo Nnennanya Geri-Robert, well-known as Deaconess Ugo or DUGR, was born on August 20, 1969 to late Chief U.U. Anya and Lolo Dorothy Anya in Bukuru, Jos, Plateau State. She was their fourth child and first daughter, the Ada of the family. She was her father's favourite child and the bridge in her family.",
    ],
  },
  {
    title: "Education & Career",
    paragraphs: [
      "She started her early education at Aggrey Primary School, Arochukwu, in the former Imo State, now Abia State. She consistently won the prize for the best student in her class. She continued to secondary school at Ohafia Girls Secondary School, but after completing the first year she gained admission into Queens College, Lagos, where she completed both WASC and A Levels in 1983 and 1985 respectively.",
      "During her sojourn at Queens College she was not only excellent in academics but also in sports. She was an award-winning athlete, representing her school in various athletic competitions. She also took interest in the French language and was among the batch of students selected to attend a two-month French language proficiency training in the Benin Republic.",
      "After A Levels she got admission through direct entry into the University of Lagos for her tertiary education and graduated with a second-class upper degree in Business Administration in 1988. She went for the one-year national service and returned to the University of Lagos for a postgraduate degree, M.Sc. Business Administration, which she completed in 1991.",
      "Post graduation, she started out as a lecturer in the Department of Business Administration, University of Lagos. She was later introduced to MAP Research Ltd by one of the lecturers in her department, where her career as a research professional started. She worked at MAP Research for years and rose to the position of Deputy Managing Director until 2001, when she left to join Market Trends/Research International.",
      "She was an Executive Director at Market Trends/Research International. After some years, she left to start RealEdge Options Ltd, but that only lasted for a couple of years before she was head-hunted by a multinational organization, Millward Brown, for the position of pioneer Country Managing Director. Later she became Managing Director, Kantar Millward Brown. After the Millward Brown merger with Kantar, she became an Executive Director at Kantar Nigeria. After a few years with Kantar, she exited to found another practice, The Insight Place. She was the Managing Partner until her transition to glory.",
      "She was a consummate marketing and research professional, widely recognized in the industry, with membership in several professional bodies. She also held key positions in a few of them, including FNIMN (Fellow, National Institute of Marketing in Nigeria), past Vice President of Nigeria Market Research Association, Member of the Nigeria Institute of Management (Chartered), Adjunct Faculty at Lagos Business School, and Advisor and Mentor to The German Cooperation Council (Deutsche Zusammenarbeit).",
    ],
  },
  {
    title: "Salvation & Ministry",
    paragraphs: [
      "While working at MAP Research, she was invited to a Christ Embassy cell outreach by Pastor Shola Olubode, and there she gave her life to Christ. She became a member of Christ Embassy and not long afterwards joined The Haven.",
      "A passionate member of The Haven Nation, she grew through the cell system to become a Haven Governor and afterwards became Zonal Secretary Finance of The Haven Zone A5. She was ordained a Deaconess in 2016. She impacted many people with her Christian ministry. She was an ardent soul winner, loved to go out for street evangelism, and was also a consistent top partner in the ministry for many years. Giving was her life.",
    ],
  },
  {
    title: "Family",
    paragraphs: [
      "She got married to her best friend, Pastor Robert Geri, on March 15, 2003, and they celebrated their 20th wedding anniversary in March. Theirs was a Christian home in word and in deed. Their home was a succour to many.",
      "She was a mother to many: loving, caring, and very generous to all. She was never tired of giving and helping others.",
      "She is survived by her loving husband, aged mother, brothers, sisters, nephews, and nieces.",
    ],
  },
] as const;

export function StoryPage({ content }: { content: MemorialContent }) {
  return (
    <div className="page-stack biography-page">
      <section className="panel biography-card">
        <div className="biography-body">
          <p className="eyebrow">Biography</p>
          <h2>{content.person.name}</h2>
          <div className="biography-card-image">
            <MediaPlaceholder asset={content.person.portrait} tone="sage" />
          </div>
          <div className="biography-prose">
            {biographySections.map((section) => (
              <section key={section.title} className="biography-section">
                <h3>{section.title}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
