import { MediaPlaceholder } from "../components/shared/MediaPlaceholder";
import { SectionIntro } from "../components/shared/SectionIntro";
import { MemorialContent } from "../types/memorial";

export function StoryPage({ content }: { content: MemorialContent }) {
  return (
    <div className="page-stack biography-page">
      <section className="page-hero panel biography-hero">
        <div className="biography-hero-grid">
          <div className="biography-hero-copy">
            <SectionIntro
              eyebrow="Biography"
              title="Deaconess Ugo Geri Robert"
              body="A biography of faith, family devotion, professional excellence, and a life remembered with deep gratitude."
            />
            <p className="biography-deck">{content.person.familyMessage}</p>
            <div className="story-pill-row">
              {content.person.roles.map((role) => (
                <span key={role} className="pill muted">
                  {role}
                </span>
              ))}
            </div>
          </div>
          <div className="biography-hero-image-box">
            <MediaPlaceholder asset={content.person.portrait} tone="warm" />
          </div>
        </div>
      </section>

      <section className="page-section split-layout">
        <div className="panel biography-body">
          <h3>Biography overview</h3>
          <p>
            Our dearly beloved Ugo Nnennanya Geri-Robert, well-known as Deaconess Ugo or DUGR, was born on August 20,
            1969 to late Chief U.U. Anya and Lolo Dorothy Anya in Bukuru, Jos, Plateau State. She was their fourth
            child and first daughter, the Ada of the family, and was remembered as her father&apos;s favorite child and a
            bridge within the family.
          </p>
          <div className="stack-list">
            <article className="timeline-item">
              <p className="eyebrow">Early years</p>
              <h4>She stood out from an early age.</h4>
              <p>
                She began her education at Aggrey Primary School, Arochukwu, in the former Imo State, now Abia State,
                where she consistently won prizes as the best student in her class. She later attended Ohafia Girls
                Secondary School before gaining admission into Queens College, Lagos, where she completed both WASC and
                A Levels in 1983 and 1985 respectively. At Queens College, she distinguished herself not only in
                academics but also in sports as an award-winning athlete, and she was among the students selected for
                a two-month French language proficiency training in the Benin Republic.
              </p>
            </article>
            <article className="timeline-item">
              <p className="eyebrow">Education and career</p>
              <h4>She built an exceptional professional life.</h4>
              <p>
                After her A Levels, she gained direct entry admission into the University of Lagos, graduating with a
                second-class upper degree in Business Administration in 1988. She completed her one-year NYSC service,
                returned to the University of Lagos for an M.Sc. in Business Administration, and completed it in 1991.
                She began her professional journey as a lecturer in the Department of Business Administration,
                University of Lagos, before being introduced to MAP Research Ltd, where her career in research
                flourished.
              </p>
              <p>
                She rose to Deputy Managing Director at MAP Research before joining Market Trends/Research
                International, where she served as Executive Director. She later founded RealEdge Options Ltd, then was
                head-hunted by Millward Brown as pioneer Country Managing Director, eventually becoming Managing
                Director of Kantar Millward Brown and later Executive Director at Kantar Nigeria. After leaving Kantar,
                she founded The Insight Place and served as Managing Partner until her transition to glory.
              </p>
              <p>
                She was widely recognized as a consummate marketing and research professional and held membership and
                leadership positions in several professional bodies, including Fellow of the National Institute of
                Marketing of Nigeria, past Vice President of the Nigeria Market Research Association, Member of the
                Nigeria Institute of Management, Adjunct Faculty at Lagos Business School, and Advisor and Mentor to
                the German Cooperation Council.
              </p>
            </article>
            <article className="timeline-item">
              <p className="eyebrow">Salvation and ministry</p>
              <h4>Her Christian life shaped the way she lived and served.</h4>
              <p>
                While working at MAP Research, she was invited to a Christ Embassy cell outreach by Pastor Shola
                Olubode, where she gave her life to Christ. She became a member of Christ Embassy and later joined The
                Haven. Through the cell system, she grew into a Haven Governor and later served as Zonal Secretary
                Finance of The Haven Zone A5. She was ordained a Deaconess in 2016.
              </p>
              <p>
                She impacted many people through her Christian ministry. She was an ardent soul winner who loved street
                evangelism, remained a consistent top partner in the ministry for many years, and lived a life deeply
                marked by giving.
              </p>
            </article>
            <article className="timeline-item">
              <p className="eyebrow">Family</p>
              <h4>Her home was a place of love, faith, and help to others.</h4>
              <p>
                She got married to her best friend, Pastor Robert Geri, on March 15, 2003, and they celebrated their
                twentieth wedding anniversary in March. Their home was a Christian home in word and deed, and it
                became a place of succor to many.
              </p>
              <p>
                She was a mother to many: loving, caring, and generous to all. She never grew tired of giving and
                helping others. She is survived by her loving husband, aged mother, brothers, sisters, nephews, and
                nieces.
              </p>
            </article>
          </div>
        </div>

        <div className="biography-side-column">
          <div className="panel biography-aside">
            <MediaPlaceholder asset={content.person.portrait} tone="sage" />
            <div className="story-note">
              <h3>Personal remembrance</h3>
              <p>
                She is remembered as loving, prayerful, generous, and present. Those same qualities echo across family
                messages, church memories, and professional tributes, forming a biography that feels both intimate and
                wide-reaching.
              </p>
            </div>
          </div>

          <div className="panel biography-body">
            <h3>Professional life and witness</h3>
            <p>
              In professional settings, she was known for excellence and quiet authority. The memorial content points
              to a woman who combined expertise with generosity, and who used her role to strengthen the people around
              her rather than simply to stand above them.
            </p>
            <p>
              Her work life is remembered not only for competence, but for the human impact of her leadership. People
              speak of encouragement, firm guidance, and the rare ability to challenge others while still making them
              feel valued. That balance is part of what made her so memorable.
            </p>
            <p>
              The biography preserved here reflects a life that was public in its influence and private in its care: a
              life where faith shaped action, family shaped priorities, and service shaped reputation.
            </p>
          </div>

          <div className="panel biography-body biography-legacy">
            <h3>Legacy</h3>
            <p>
              Her legacy continues across the people who loved her, learned from her, and were strengthened by her
              presence. She is remembered as a woman whose words mattered, whose example mattered, and whose love
              continues to speak.
            </p>
            <p>
              This biography stands as a gathered remembrance of what was repeated most often about her: mother,
              teacher, mentor, woman of faith, and a life that still inspires gratitude.
            </p>
            <div className="story-pill-row">
              {content.timeline.map((entry) => (
                <span key={entry.id} className="pill muted">
                  {entry.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
