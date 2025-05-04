// utils/subjects.ts
export const getSubjectsByBacType = (bacType: string) => {
    const commonSubjects = [
      { name: "Philosophy", field: "notePhilosophy", commentField: "philosophyComment" },
      { name: "Arabic", field: "noteArabic", commentField: "arabicComment" },
      { name: "English", field: "noteEnglish", commentField: "englishComment" },
      { name: "French", field: "noteFrench", commentField: "frenshComment" },
      { name: "Sport", field: "noteSport", commentField: "sportComment" },
      { name: "Mathematics", field: "noteMathematics", commentField: "mathematicsComment" },
    ];
  
    const specificSubjects = {
      EXPERIMENTAL_SCIENCES: [
        { name: "Science", field: "scienceNote", commentField: "scienceComment" },
        { name: "Informatics", field: "informaticsNote", commentField: "informaticsComment" },
        { name: "Physics", field: "notePhysics", commentField: "physicsComment" }

      ],
      COMPUTER_SCIENCE: [
        { name: "Algorithms", field: "algorithmsNote", commentField: "algorithmsComment" },
        { name: "STI", field: "stiNote", commentField: "stiComment" },
        { name: "Physics", field: "notePhysics", commentField: "physicsComment" }

      ],
      LITERATURE: [
        { name: "History and geography", field: "historyAndGeographyNote", commentField: "historyAndGeographyComment" },
        { name: "Islamic Education", field: "islamicNote", commentField: "islamicComment" },
        { name: "Informatics", field: "informaticsNote", commentField: "informaticsComment" }
      ],
      SPORTS: [
        { name: "Biological Sciences", field: "biologicalSciencesNote", commentField: "biologicalSciencesComment" },
        { name: "Physical Education", field: "physicalEducationNote", commentField: "physicalEducationComment" },
        { name: "Informatics", field: "informaticsNote", commentField: "informaticsComment" },
        { name: "Sports Specialization", field: "sportsSpecializationNote", commentField: "sportsSpecializationComment" },
        { name: "Science", field: "scienceNote", commentField: "scienceComment" },
        { name: "Physics", field: "notePhysics", commentField: "physicsComment" }

      ],
      ECONOMICS_AND_MANAGEMENT: [
        { name: "Economics", field: "economicsNote", commentField: "economicsComment" },
        { name: "Management", field: "managementNote", commentField: "managementComment" },
        { name: "Informatics", field: "informaticsNote", commentField: "informaticsComment" },
        { name: "History & Geography", field: "historyAndGeographyNote", commentField: "historyAndGeographyComment" }
      ],
      TECHNICAL: [
        { name: "Technical", field: "technicalNote", commentField: "technicalComment" },
        { name: "Informatics", field: "informaticsNote", commentField: "informaticsComment" },
        { name: "Physics", field: "notePhysics", commentField: "physicsComment" }

      ],
      MATHEMATICS: [
        { name: "Informatics", field: "informaticsNote", commentField: "informaticsComment" },
        { name: "Science", field: "scienceNote", commentField: "scienceComment" },
        { name: "Physics", field: "notePhysics", commentField: "physicsComment" }

      ]
    };
  
    
  
    return [
      ...commonSubjects,
      ...(specificSubjects[bacType as keyof typeof specificSubjects] || []),
    ];
  };