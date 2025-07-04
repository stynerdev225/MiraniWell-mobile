import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Input } from "@/components/ui";
import useDebounce from "@/hooks/useDebounce";
import { GridPostList, Loader } from "@/components/shared";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queries";
import AnimatedBanner from "@/components/shared/AnimatedBanner";

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
};

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
};

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage, isError, isLoading } = useGetPosts();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedSearch);

  // State for selected pricing plan
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "standard" | "premium" | null>(null);

  useEffect(() => {
    if (inView && !searchValue && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, searchValue, fetchNextPage, hasNextPage]);

  if (isLoading)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  if (isError || !posts) {
    return (
      <div className="flex-center w-full h-full flex-col">
        <p className="text-light-4 mt-10 text-center">Something went wrong while loading posts</p>
        <p className="text-light-4 text-sm mt-2 text-center">Please try again later</p>
      </div>
    );
  }

  const shouldShowSearchResults = searchValue !== "";

  // Check if there are no posts to display (all pages have empty documents)
  const hasNoPosts = posts?.pages && posts.pages.length > 0 &&
    posts.pages.every((item) => !item?.documents || item.documents.length === 0);

  // Show "End of posts" message when not searching and there are no posts
  const shouldShowEndOfPosts = !shouldShowSearchResults && hasNoPosts;

  // Handle plan selection
  const handleSelectPlan = (plan: "basic" | "standard" | "premium") => {
    setSelectedPlan(plan);
    // In a real app, you would navigate to checkout or subscription flow
    console.log(`Selected ${plan} plan`);
  };

  return (
    <div className="explore-container">
      {/* Banner */}
      <AnimatedBanner imageSrc="/assets/images/explore-banner.svg" showElementIcons={true} iconSet="explore" height="h-56">
        <h1 className="h1-bold text-white mb-2 drop-shadow-lg">Explore Community</h1>
        <p className="body-medium text-light-1 drop-shadow-md max-w-md">Discover posts, groups, and connect with like-minded individuals</p>
      </AnimatedBanner>

      <div className="explore-inner_container mt-8 px-6">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>

      {/* Group Hosting Packages Section */}
      <div className="w-full max-w-5xl mt-16 mb-12 px-6">
        <h2 className="h3-bold md:h2-bold w-full mb-8 text-center bg-gradient-to-r from-primary-500 to-accent-2 text-transparent bg-clip-text">Group Hosting Packages</h2>
        <p className="text-light-3 text-center max-w-2xl mx-auto mb-10">
          Create and manage your own groups with our flexible hosting packages. Choose the option that best suits your community needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Basic Plan */}
          <div className={`bg-dark-3 rounded-xl overflow-hidden border-2 transition-all ${selectedPlan === "basic" ? "border-primary-500" : "border-dark-4"}`}>
            <div className="p-6">
              <div className="flex-center">
                <div className="bg-dark-2 p-3 rounded-full">
                  <img
                    src="/assets/icons/people.svg"
                    width={28}
                    height={28}
                    alt="Basic Plan"
                    className="opacity-80"
                  />
                </div>
              </div>
              <h3 className="body-bold text-center mt-4">Basic Group Hosting</h3>
              <div className="flex-center mt-4 mb-6">
                <span className="h3-bold">$5</span>
                <span className="text-light-3 ml-1">/month</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <div className="text-primary-500 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-light-2 text-sm">Create and manage a simple group</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-primary-500 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-light-2 text-sm">Limited number of events per month</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-primary-500 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-light-2 text-sm">Basic group management tools</p>
                </div>
              </div>

              <button
                className={`w-full py-3 rounded-lg ${selectedPlan === "basic" ? "bg-primary-500 text-white" : "bg-dark-2 text-light-2"} transition-colors`}
                onClick={() => handleSelectPlan("basic")}
              >
                {selectedPlan === "basic" ? "Selected" : "Choose Plan"}
              </button>
            </div>
          </div>

          {/* Standard Plan */}
          <div className={`bg-dark-3 rounded-xl overflow-hidden border-2 relative transition-all ${selectedPlan === "standard" ? "border-primary-500" : "border-dark-4"}`}>
            <div className="absolute top-0 right-0 bg-primary-500 px-4 py-1 rounded-bl-lg">
              <p className="tiny-medium text-white">Popular</p>
            </div>
            <div className="p-6">
              <div className="flex-center">
                <div className="bg-dark-2 p-3 rounded-full">
                  <img
                    src="/assets/icons/people.svg"
                    width={28}
                    height={28}
                    alt="Standard Plan"
                    className="opacity-90"
                  />
                </div>
              </div>
              <h3 className="body-bold text-center mt-4">Standard Group Hosting</h3>
              <div className="flex-center mt-4 mb-6">
                <span className="h3-bold">$15</span>
                <span className="text-light-3 ml-1">/month</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <div className="text-primary-500 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-light-2 text-sm">Create and manage multiple groups</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-primary-500 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-light-2 text-sm">Higher event limit and basic analytics</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-primary-500 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-light-2 text-sm">Priority support</p>
                </div>
              </div>

              <button
                className={`w-full py-3 rounded-lg ${selectedPlan === "standard" ? "bg-primary-500 text-white" : "bg-dark-2 text-light-2"} transition-colors`}
                onClick={() => handleSelectPlan("standard")}
              >
                {selectedPlan === "standard" ? "Selected" : "Choose Plan"}
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className={`bg-dark-3 rounded-xl overflow-hidden border-2 transition-all ${selectedPlan === "premium" ? "border-primary-500" : "border-dark-4"}`}>
            <div className="p-6">
              <div className="flex-center">
                <div className="bg-dark-2 p-3 rounded-full">
                  <img
                    src="/assets/icons/people.svg"
                    width={28}
                    height={28}
                    alt="Premium Plan"
                    className="opacity-100"
                  />
                </div>
              </div>
              <h3 className="body-bold text-center mt-4">Premium Group Hosting</h3>
              <div className="flex-center mt-4 mb-6">
                <span className="h3-bold">$25</span>
                <span className="text-light-3 ml-1">/month</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <div className="text-primary-500 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-light-2 text-sm">Full access to advanced group management tools</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-primary-500 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-light-2 text-sm">Unlimited events and detailed analytics</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-primary-500 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-light-2 text-sm">Dedicated support and custom features</p>
                </div>
              </div>

              <button
                className={`w-full py-3 rounded-lg ${selectedPlan === "premium" ? "bg-primary-500 text-white" : "bg-dark-2 text-light-2"} transition-colors`}
                onClick={() => handleSelectPlan("premium")}
              >
                {selectedPlan === "premium" ? "Selected" : "Choose Plan"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Comparison Table */}
      <div className="w-full max-w-5xl mt-10 mb-12 px-6">
        <h3 className="body-bold md:h3-bold mb-6 text-center bg-gradient-to-r from-accent-1 to-primary-500 text-transparent bg-clip-text">Features Comparison</h3>
        <div className="overflow-x-auto rounded-xl shadow-md bg-dark-3 border border-dark-4">
          <table className="w-full">
            <thead className="border-b border-dark-4 bg-dark-4/50">
              <tr>
                <th className="text-left p-3 text-light-2">Feature</th>
                <th className="p-3 text-center text-light-2">Basic</th>
                <th className="p-3 text-center text-light-2">Standard</th>
                <th className="p-3 text-center text-light-2">Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-4">
              <tr>
                <td className="p-3 text-light-1">Number of Groups</td>
                <td className="p-3 text-center text-light-2">1</td>
                <td className="p-3 text-center text-light-2">5</td>
                <td className="p-3 text-center text-light-2">Unlimited</td>
              </tr>
              <tr>
                <td className="p-3 text-light-1">Monthly Events</td>
                <td className="p-3 text-center text-light-2">10</td>
                <td className="p-3 text-center text-light-2">25</td>
                <td className="p-3 text-center text-light-2">Unlimited</td>
              </tr>
              <tr>
                <td className="p-3 text-light-1">Analytics</td>
                <td className="p-3 text-center text-light-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </td>
                <td className="p-3 text-center text-light-2">Basic</td>
                <td className="p-3 text-center text-light-2">Advanced</td>
              </tr>
              <tr>
                <td className="p-3 text-light-1">Custom Group URL</td>
                <td className="p-3 text-center text-light-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </td>
                <td className="p-3 text-center text-light-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </td>
                <td className="p-3 text-center text-light-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </td>
              </tr>
              <tr>
                <td className="p-3 text-light-1">Priority Support</td>
                <td className="p-3 text-center text-light-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </td>
                <td className="p-3 text-center text-light-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </td>
                <td className="p-3 text-center text-light-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </td>
              </tr>
              <tr>
                <td className="p-3 text-light-1">Group Moderators</td>
                <td className="p-3 text-center text-light-2">1</td>
                <td className="p-3 text-center text-light-2">3</td>
                <td className="p-3 text-center text-light-2">10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-5xl mb-12 px-6">
        <h3 className="body-bold md:h3-bold mb-6 text-center bg-gradient-to-r from-primary-600 to-accent-1 text-transparent bg-clip-text">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div className="bg-dark-3 p-4 rounded-lg border border-dark-4 hover:border-primary-500 transition-colors shadow-sm">
            <h4 className="base-semibold mb-2">Can I upgrade or downgrade my plan later?</h4>
            <p className="text-light-2 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes to your subscription will take effect at the beginning of the next billing cycle.</p>
          </div>
          <div className="bg-dark-3 p-4 rounded-lg border border-dark-4 hover:border-primary-500 transition-colors shadow-sm">
            <h4 className="base-semibold mb-2">Is there a free trial available?</h4>
            <p className="text-light-2 text-sm">Yes, all plans come with a 7-day free trial so you can test the features before committing to a subscription.</p>
          </div>
          <div className="bg-dark-3 p-4 rounded-lg border border-dark-4 hover:border-primary-500 transition-colors shadow-sm">
            <h4 className="base-semibold mb-2">What payment methods are accepted?</h4>
            <p className="text-light-2 text-sm">We accept all major credit cards, PayPal, and various local payment methods depending on your region.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-full max-w-5xl mb-12 px-6">
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-8 rounded-xl shadow-xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-2 rounded-full opacity-20 translate-y-1/2 -translate-x-1/2"></div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            <div>
              <h3 className="h3-bold text-white mb-2">Ready to Start Your Group?</h3>
              <p className="text-light-2 mb-4 max-w-md">Build your community with our powerful group hosting tools. Get started today and connect with like-minded individuals.</p>
              <button
                className="bg-white text-indigo-900 px-6 py-3 rounded-lg font-medium hover:bg-light-2 transition-colors hover:shadow-md"
                onClick={() => handleSelectPlan("standard")}
              >
                Get Started Now
              </button>
            </div>
            <div className="bg-dark-1 bg-opacity-30 p-5 rounded-lg w-full md:w-auto border border-white/20 backdrop-blur-sm">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-500 p-2 rounded-full flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-white text-sm">7-day free trial</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary-500 p-2 rounded-full flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-white text-sm">No credit card required</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary-500 p-2 rounded-full flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-white text-sm">Cancel anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mb-7 px-6">
        <h3 className="body-bold md:h3-bold bg-gradient-to-r from-accent-2 to-primary-500 text-transparent bg-clip-text">Popular Today</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer border border-dark-4 hover:border-primary-500 transition-colors">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl px-6">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowEndOfPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
