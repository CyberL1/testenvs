<script lang="ts">
import { onMount } from "svelte";
let error: string = "";

onMount(() => {
  document.querySelector("form")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const data = {
      name: form.name.value,
      repositories: Array.from(document.querySelectorAll("fieldset")).map(
        (fieldset) => {
          const urlInput = fieldset.querySelector(
            'input[name="repo-url"]',
          ) as HTMLInputElement;
          const branchInput = fieldset.querySelector(
            'input[name="repo-branch"]',
          ) as HTMLInputElement;

          let returned = {};
          if (
            urlInput.value.trim().length > 0 &&
            branchInput.value.trim().length > 0
          ) {
            returned = {
              url: urlInput.value.trim(),
              branch: branchInput.value.trim(),
            };
          }

          return returned;
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
      <div>
      <label for="repo-url">Repository URL</label>
      <input id="repo-url" name="repo-url" type="text" required />
      </div>
      <div>
      <label for="repo-branch">Branch</label>
      <input id="repo-branch" name="repo-branch" type="text" required />
      </div>
    </fieldset>
    <button type="button" on:click={() => {
      const fieldsets = document.querySelectorAll("fieldset");
      const lastFieldset = fieldsets[fieldsets.length - 1];
      const clone = lastFieldset.cloneNode(true) as HTMLElement;

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.textContent = "Delete";
      deleteBtn.style.marginLeft = "1rem";
      deleteBtn.onclick = () => clone.remove();
      clone.appendChild(deleteBtn);
      
      clone.querySelectorAll("input").forEach(input => {
        input.value = "";
        input.required = false;
      });
      lastFieldset.after(clone);
    }}>
      Add Another Repository
    </button>
    <button type="submit">Add Container</button>
  </form>
</div>
