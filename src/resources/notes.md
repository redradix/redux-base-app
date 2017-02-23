#Resources

Resources are in charge of loading the required information on the project. Resources use three of the modules to do their job:

- Pagination: Used to know how many items it should ask for (in case is needed) and from which it should start.
- Filters: Used to add filters to the endpoint
- Entities: Used as a cache. Asking if the next needed items are already on the entities. For that purpose, the Resources
will implement a sort function. With that ordered list and the pagesize from pagination, will be enough to see if request to
the server is needed

Also, they can use the communications module to timestamp when they are starting the request and when they have finished. 
Whenever the info is ready, they will update the entities using the entities module and any other relevant task common to every request to this resource. 
