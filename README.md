#Folder Layout:
src/
  main.tsx
  App.tsx                # top-level routing & layout wrapper

  router/
    routes.tsx           # all routes defined here

  layout/
    MainLayout.tsx       # shared layout (nav + footer + outlet)
    PageSection.tsx      # optional: generic section wrapper

  features/
    home/
      HomePage.tsx
      components/
        Hero.tsx
        RecentHighlights.tsx

    software/
      SoftwarePage.tsx
      components/
        ProjectGrid.tsx
        ProjectCard.tsx
      hooks/
        useSoftwareProjects.ts
      types.ts           

    data/
      DataPage.tsx
      components/
        AiProjectList.tsx
        AnalysisGallery.tsx
      hooks/
        useDataProjects.ts
      types.ts

    finance/
      FinancePage.tsx
      components/
        ArticleList.tsx
        MarketView.tsx
      hooks/
        useFinancePosts.ts
      types.ts

    contact/
      ContactPage.tsx
      components/
        ContactInfo.tsx
        SocialLinks.tsx
        ContactForm.tsx

  components/             # truly shared UI
    NavBar.tsx
    Footer.tsx
    Card.tsx
    TagList.tsx
    ExternalLink.tsx
    SectionHeader.tsx

  content/                # content as data, not hard-coded in components
    softwareProjects.ts
    dataProjects.ts
    financePosts.ts
    socialLinks.ts
    contactInfo.ts

  styles/
    globals.css
    variables.css         # if you want
    components.css        # or use CSS modules / Tailwind

  lib/
    analytics.ts
    formatters.ts
    constants.ts

  types/
    common.ts             # shared types (Tag, Link, etc.)
