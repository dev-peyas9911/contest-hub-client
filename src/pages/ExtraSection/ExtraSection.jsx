import React from "react";
import Container from "../../components/Shared/Container";

const ExtraSection = () => {
  // Static data for the Extra Section
  const extraFeatures = [
    {
      id: 1,
      title: "Contest Prep Checklist",
      description:
        "A comprehensive checklist to ensure you are fully prepared before diving into any contest.",
      tags: ["Resource", "Tips", "Beginner"],
      icon: "📋", // Clipboard icon
      color: "primary",
    },
    {
      id: 2,
      title: "Top Performer Interviews",
      description:
        "Exclusive interviews and strategies from the winners of our most competitive contests.",
      tags: ["Inspiration", "Strategy", "Advanced"],
      icon: "🏆", // Trophy icon
      color: "secondary",
    },
    {
      id: 3,
      title: "Community Code Review",
      description:
        "Submit your practice code to the community and get constructive feedback for improvement.",
      tags: ["Feature", "Feedback", "Coding"],
      icon: "👨‍💻", // Developer icon
      color: "accent",
    },
    {
      id: 4,
      title: "Community Code Review",
      description:
        "Submit your practice code to the community and get constructive feedback for improvement.",
      tags: ["Feature", "Feedback", "Coding"],
      icon: "👨‍💻",
      color: "secondary",
    },
    {
      id: 5,
      title: "Performance Tracker",
      description:
        "Visualize your progress, track rankings, and identify areas needing improvement over time.",
      tags: ["Analytics", "Data", "Personal"],
      icon: "📈",
      color: "secondary",
    },
    {
      id: 6,
      title: "Mock Contest Simulator",
      description:
        "Practice under timed, realistic conditions with past contest problem sets and ranking simulation.",
      tags: ["Practice", "Simulation", "Timed"],
      icon: "⏱️",
      color: "secondary",
    },

    // --- Group 3: Challenges/Fun (Accent Color) ---
    {
      id: 7,
      title: "Daily Micro-Challenges",
      description:
        "Solve small, targeted problems every day to keep your competitive skills sharp and active.",
      tags: ["Challenge", "Daily", "Quick"],
      icon: "⚡",
      color: "accent",
    },
    {
      id: 8,
      title: "Themed Mini-Games",
      description:
        "Engaging, fun programming puzzles based on seasonal or trending topics for a break.",
      tags: ["Fun", "Puzzles", "Break"],
      icon: "🕹️",
      color: "accent",
    },
    {
      id: 9,
      title: "Expert Q&A Sessions",
      description:
        "Join live sessions with industry experts to ask questions and discuss complex problems.",
      tags: ["Live", "Expert", "Interaction"],
      icon: "🗣️",
      color: "accent",
    },
  ];
  return (
    <Container>
      <div className="p-8 bg-base-200 min-h-screen">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-primary">
            Extra Hub Section
          </h1>
          <p className="text-xl text-base-content mt-2">
            Dive deeper with exclusive resources and features for contest
            participants.
          </p>
          {/*  - Suggestive diagram for the component layout */}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {extraFeatures.map((feature) => (
            <div
              key={feature.id}
              className={`card bg-base-100 shadow-xl border-t-4 border-${feature.color}`}
            >
              <div className="card-body">
                {/* Icon and Title */}
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-4xl">{feature.icon}</span>
                  <h2 className="card-title text-2xl">{feature.title}</h2>
                </div>

                {/* Description */}
                <p className="text-base-content text-opacity-80 grow">
                  {feature.description}
                </p>

                {/* Tags/Badges */}
                <div className="card-actions justify-end mt-4">
                  {feature.tags.map((tag) => (
                    <div
                      key={tag}
                      className={`badge badge-outline badge-${feature.color} text-xs`}
                    >
                      {tag}
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div className="mt-4">
                  <button
                    className={`btn btn-sm btn-block btn-${feature.color}`}
                  >
                    Explore {feature.icon}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ExtraSection;
