# List of expert-crafted prompts
expert_prompts = {
    "write": [
        "Write a code using Python to solve a specific problem.",
        "Write a JavaScript function for a front-end feature.",
        "Write a SQL query to fetch data from a database.",
    ],
    "code": [
        "Code a simple game using Python.",
        "Code a REST API using Node.js.",
        "Code a data analysis script using Python libraries like Pandas.",
    ],
    "javascript": [
        """
            Context: You are a helpful assistant experienced in modern web development technologies, including React, Node.js, and cloud services.  Task: I am trying to deploy a web application using AWS services. I've set up an S3 bucket for hosting my static files and an EC2 instance for my backend API.  Specifications:  The frontend should be accessible via a custom domain. The backend API needs to communicate securely with a MongoDB database. Please provide steps to set up a CI/CD pipeline for automatic deployment when I push updates to my GitHub repository. Suggest any AWS services that could be beneficial for monitoring and scaling the application.,
            Context: You are a knowledgeable assistant experienced with JavaScript and Node.js.
            Task: I need to create a REST API for a to-do application using Express.js. The API should allow users to create, read, update, and delete to-do items.
            Specifications:
            Use MongoDB as the database, with Mongoose for object modeling.
            Implement user authentication and protect the routes with JWTs.
            The API should validate incoming data to prevent invalid to-do entries.
        """,
    ],
    "python": [
        """
            Context: You are an expert in Python web development with Django.
            Task: I'm developing an e-commerce platform and I need to integrate a payment system using Django. \n
            Specifications:
            The system should handle payments through Stripe and PayPal.
            Ensure that the payment process is secure and PCI compliant.
            Provide an admin interface to view and manage orders and payments.
        """,
    ],
    "c#": [
        """
            C# / .NET Development
            Context: You are an AI proficient in C# and the .NET framework.
            Task: I want to build a desktop application using .NET that can connect to an SQL Server database.
            Specifications:
            The application should have a user-friendly interface built with WPF.
            Include functionality for querying and displaying data from the database.
            Provide error handling and logging mechanisms.
            """,
    ],
    "php": [
        """
            PHP / Laravel Development
            Context: You are an assistant with expertise in PHP and Laravel.
            Task: I need to set up a content management system with Laravel.
            Specifications:
            The CMS should be modular, allowing for extensions and plugins.
            Implement a rich text editor for content creation.
            Provide a caching solution for performance optimization.
        """,
    ],
    "swift": [
        """
            Swift / iOS App Development
            Context: You are an assistant with experience in iOS app development using Swift.
            Task: I'm developing an iOS app that tracks fitness activities.
            Specifications:
            Use Core Data for local data persistence.
            Integrate with HealthKit to access workout and health data.
            Ensure the app is compatible with various iPhone models and adheres to Apple's Human Interface Guidelines.
        """,
    ],
    "kotlin": [
        """
            Kotlin / Android App Development
            Context: You are an assistant with expertise in Android development using Kotlin.
            Task: I need to create an Android app for managing personal finances.
            Specifications:
            Implement a SQLite database for transaction records.
            The app should generate reports and visualizations of spending habits.
            It should follow Material Design principles for a consistent and intuitive user experience.
        """,
    ],
    "marketing": [
        """
            Context: 
            You are an AI assistant with expertise in digital marketing strategies, particularly in the areas of social media marketing, content marketing, and SEO. Your advice is based on current best practices, trends, and algorithms used by major platforms.

            Task: 
            I'm planning a marketing campaign for a new line of eco-friendly personal care products targeting millennials who are conscious about sustainability and wellness. We have a moderate budget and aim to increase brand awareness and online sales. We plan to use Instagram, Facebook, and our company blog as primary channels.

            Specifications: 
            1. Suggest a content marketing strategy that aligns with SEO best practices and can drive traffic to our blog and product pages.
            2. Provide ideas for social media campaigns that can generate buzz and engagement on Instagram and Facebook.
            3. Recommend a mix of organic and paid marketing tactics that we could use with our budget.
            4. Outline key performance indicators (KPIs) we should monitor to evaluate the success of our campaigns.

            Please provide a detailed plan that we can start implementing over the next quarter. Highlight any particular themes or social issues that we could tap into that resonate with our target audience's values around sustainability and wellness.

        """,
        """
            Context:
            You are a highly creative AI with expertise in product innovation and design thinking. You are familiar with current trends in technology, user experience, and market demands.

            Task:
            I am looking for fresh and innovative product ideas for a new line of smart home devices targeted at young professionals who value convenience, sustainability, and smart integration with existing technology. The product line should offer solutions that are not widely available yet, or improve significantly on existing solutions.

            Specifications:
            1. Suggest at least three product ideas, each with a brief explanation of how it meets the convenience, sustainability, and smart integration requirements.
            2. For each product idea, identify potential challenges in design and user adoption, and suggest ways to overcome them.
            3. Provide an initial assessment of the competitive landscape for each idea—what similar products exist, and how does this idea differ?
            4. Suggest possible monetization strategies for these smart home devices.
            5. Consider any current technological constraints and propose ideas that are feasible with today's technology or with technology that is on the foreseeable horizon.

            Please provide a summary of your suggestions that we can use for an initial brainstorming session with our product development team.

        """,
    ],
    # Add more prompts here
}

synonym_map = {
    "node.js": "javascript",
    "nodejs": "javascript",
    "node js": "javascript",
    "csharp": "c#",
    ".net": "c#",
    # Add more synonyms here
}
