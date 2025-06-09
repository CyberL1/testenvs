<script lang="ts">
import { onMount } from "svelte";

let error: string = "";
let defaultRepos: string[] = [];
let selectedRepoBranches: string[] = [];

onMount(async () => {
  const defaultReposReq = await fetch("http://localtest.me/api/default_repos");
  defaultRepos = await defaultReposReq.json();

  const branchesReq = await fetch(
    `https://api.github.com/repos/${defaultRepos[0].split("/")[3]}/${defaultRepos[0].split("/")[4]}/branches`,
  );
  const branchesJson = await branchesReq.json();

  const branchNames = branchesJson.map((b) => b.name);
  selectedRepoBranches = branchNames;

  document.querySelector("form")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const data = {
      name: form.name.value,
      repositories: Array.from(document.querySelectorAll("fieldset")).map(
        (fieldset) => {
          const repoSelect = fieldset.querySelector(
            'select[name="repo"]',
          ) as HTMLInputElement;
          const branchSelect = fieldset.querySelector(
            'select[name="branch"]',
          ) as HTMLInputElement;

          return { url: repoSelect.value, branch: branchSelect.value };
        },
      ),
    };

    const newContainer = await fetch("/api/containers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const newContainerJson = await newContainer.json();

    if (newContainerJson.error) {
      error = `Error: ${newContainerJson.message}`;
      return;
    }

    window.location.href = `/containers/${newContainerJson.id}`;
  });
});
</script>

<style>
  .container {
    max-width: 900px;
    margin: 2rem auto;
    padding: 2rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  }
  h1 {
    margin-bottom: 1rem;
  }
</style>

<div class="container">
  {#if error}
    <div style="color: red; margin-bottom: 1rem;">{error}</div>
  {/if}
  <h1>Add New Container</h1>
  <form>
    <div>
      <label for="name">Container Name</label>
      <input id="name" name="name" type="text" required />
    </div>
    <fieldset style="margin-top: 1rem; padding: 1rem; border: 1px solid #eee;">
      <legend>Repository</legend>
      {#if defaultRepos && defaultRepos.length > 0}
        <div style="margin-bottom: 1rem;">
          <label for="repo">Repository:</label>
          <select id="repo" name="repo" required on:change={async (e) => {
            selectedRepoBranches = [];

            const selected = defaultRepos[e.target.selectedIndex];
            const branchesReq = await fetch(`https://api.github.com/repos/${selected.split("/")[3]}/${selected.split("/")[4]}/branches`)
            const branchesJson = await branchesReq.json();

            const branchNames = branchesJson.map(b => b.name);
            selectedRepoBranches = branchNames;
          }}>
        {#each defaultRepos as repo}
          <option value={repo}>{repo}</option>
        {/each}
          </select>
        </div>
      {/if}
      <div>
        <label for="branch">Branch:</label>
        <select id="branch" name="branch" required>
          {#each selectedRepoBranches as branch}
            <option value={branch}>{branch}</option>
          {/each}
        </select>
      </div>
    </fieldset>
    <button type="button" on:click={async () => {
      const fieldsets = document.querySelectorAll("fieldset");
      const lastFieldset = fieldsets[fieldsets.length - 1];
      const clone = lastFieldset.cloneNode(true) as HTMLElement;

      const existingDeleteBtn = clone.querySelector("button");

      if (existingDeleteBtn) {
        existingDeleteBtn.remove();
      }

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.textContent = "Delete";
      deleteBtn.style.marginLeft = "1rem";
      deleteBtn.onclick = () => clone.remove();
      clone.appendChild(deleteBtn);

      // Make repo select in the clone fetch branches on change
      const repoSelect = clone.querySelector('select[name="repo"]');
      const branchSelect = clone.querySelector('select[name="branch"]');
      if (repoSelect && branchSelect) {
        repoSelect.selectedIndex = 0;

        // Refetch branches for the cloned repo select
        const selected = repoSelect.value;
        const parts = selected.split("/");
        const branchesReq = await fetch(`https://api.github.com/repos/${parts[3]}/${parts[4]}/branches`);
        const branchesJson = await branchesReq.json();
        const branchNames = branchesJson.map((b: any) => b.name);

        // Clear and repopulate branch select
        branchSelect.innerHTML = "";
        branchNames.forEach((branch: string) => {
          const option = document.createElement("option");
          option.value = branch;
          option.textContent = branch;
          branchSelect.appendChild(option);
        });

        repoSelect.addEventListener('change', async (e: Event) => {
          const target = e.target as HTMLSelectElement;
          const selected = target.value;
          const parts = selected.split("/");

        const branchesReq = await fetch(`https://api.github.com/repos/${parts[3]}/${parts[4]}/branches`);
        const branchesJson = await branchesReq.json();
        const branchNames = branchesJson.map((b: any) => b.name);

        // Clear and repopulate branch select
        branchSelect.innerHTML = "";
        branchNames.forEach((branch: string) => {
          const option = document.createElement("option");
          option.value = branch;
          option.textContent = branch;
          branchSelect.appendChild(option);
        });
      });
      }

      lastFieldset.after(clone);
    }}>
      Add Another Repository
    </button>
    <button type="submit">Add Container</button>
  </form>
</div>
