import React from "react";
import Header from "./components/Header";

const faqs = [
	{
		question: "What is StatusApp?",
		answer: (
			<>
				<span className="font-semibold">StatusApp</span> is a vibrant platform
				where users can share, discover, and save creative status updates for
				social media, messaging apps, and more. Our community-driven approach
				ensures a diverse and ever-growing collection of statuses for every mood
				and occasion.
			</>
		),
	},
	{
		question: "How do I create a new status?",
		answer: (
			<>
				Simply click the <strong>Create</strong> button in the header. Write your
				status in the provided form and submit it to share with the community.
				You can also add tags and select a category to help others find your
				status easily.
			</>
		),
	},
	{
		question: "Can I save or bookmark statuses?",
		answer: (
			<>
				Absolutely! You can like and bookmark any status to save it for later.
				Access your saved statuses anytime from your profile page, making it easy
				to revisit your favorites.
			</>
		),
	},
	{
		question: "Is StatusApp free to use?",
		answer: (
			<>
				Yes, StatusApp is completely free for everyone. Sign up in seconds and
				start exploring, sharing, and saving statuses without any cost.
			</>
		),
	},
	{
		question: "How do I contact support?",
		answer: (
			<>
				Visit our{" "}
				<a
					href="/contact"
					className="text-pink-600 underline font-medium"
				>
					Contact
				</a>{" "}
				page to reach out to our support team. We're here to help with any
				questions, feedback, or issues you may have.
			</>
		),
	},
	{
		question: "Can I suggest new features?",
		answer: (
			<>
				We love hearing from our users! Please use the contact form to share your
				suggestions and ideas. Your feedback helps us improve and grow StatusApp.
			</>
		),
	},
	{
		question: "Is my data safe on StatusApp?",
		answer: (
			<>
				We take your privacy seriously. All your data is securely stored and never
				shared with third parties. You can manage your account and privacy
				settings from your profile.
			</>
		),
	},
	{
		question: "Can I delete my account?",
		answer: (
			<>
				Yes, you can delete your account at any time from your profile settings.
				All your data will be permanently removed from our servers.
			</>
		),
	},
];

const FAQ = () => {
	return (
		<>
			<Header />
			<div className="bg-gradient-to-b from-white to-pink-50 min-h-screen py-12">
				<div className="container mx-auto w-full px-4">
					<div className="bg-white rounded-xl shadow-lg p-8">
						<h2 className="text-3xl font-extrabold text-pink-700 mb-6 text-center">
							Frequently Asked Questions
						</h2>
						<p className="text-gray-600 mb-8 text-center">
							Find answers to the most common questions about StatusApp. If you
							need more help, feel free to{" "}
							<a href="/contact" className="text-pink-600 underline">
								contact us
							</a>
							.
						</p>
						<div className="space-y-6">
							{faqs.map((faq, idx) => (
								<div key={idx} className="border-b pb-6">
									<h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
										<span className="mr-2 text-pink-600">Q{idx + 1}.</span>
										{faq.question}
									</h3>
									<p className="text-gray-700 pl-7">{faq.answer}</p>
								</div>
							))}
						</div>
						<div className="mt-10 text-center">
							<span className="inline-block bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-medium">
								Still have questions?{" "}
								<a href="/contact" className="underline">
									Contact our team
								</a>
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FAQ;
