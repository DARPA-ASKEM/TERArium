package software.uncharted.terarium.hmiserver.resources;

import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import software.uncharted.terarium.hmiserver.models.Project;
import software.uncharted.terarium.hmiserver.proxies.ProjectProxy;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.List;

@Path("/api/projects")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Project REST Endpoint")
public class ProjectResource {

	@RestClient
	ProjectProxy proxy;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Tag(name = "Get all projects for a given user")
	public Response getProjects(
		@QueryParam("sort") @DefaultValue("") final String sortQuery,
		@QueryParam("page") @DefaultValue("0") final int pageIndex,
		@QueryParam("size") @DefaultValue("100") final int pageSize
	) {
		final List<Project> projects = proxy.getProjects(sortQuery, pageIndex, pageSize);
		if (projects.isEmpty()) {
			return Response.noContent().build();
		}
		return Response.ok(projects).build();
	}

	@GET
	@Path("/{id}")
	public Response getProject(
		@QueryParam("id") final Long id
	) {
		final Project entity = proxy.getProject(id);

		if (entity == null) {
			throw new WebApplicationException(Response.Status.NOT_FOUND);
		}
		return Response.ok(entity).build();
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createProject(final Project newProject) {
		final Project entity = proxy.createProject(newProject);
		return Response.created(URI.create("/projects/" + entity.id)).build();
	}

	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateProject(final Long id, final Project updatedProject) {
		if (proxy.getProject(id) == null) {
			throw new WebApplicationException(Response.Status.NOT_FOUND);
		}

		final Project entity = proxy.updateProject(id, updatedProject);

		if (entity == null) {
			return Response.noContent().build();
		}
		return Response.ok(entity).build();
	}

	@DELETE
	@Path("/{id}")
	public Response deleteProject(final Long id) {
		if (!proxy.deleteProject(id)) {
			throw new WebApplicationException(Response.Status.NOT_FOUND);
		}

		return Response.ok().build();
	}

	@GET
	@Path("/count")
	public Response getNumProjects() {
		final Long numProjects = proxy.getNumProjects();
		return Response.ok(numProjects).build();
	}
}