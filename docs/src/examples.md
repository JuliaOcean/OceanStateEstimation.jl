
## Physical Oceanography

In [ECCO\_standard\_plots.jl](ECCO_standard_plots.html) (➭ [code link](https://raw.githubusercontent.com/gaelforget/OceanStateEstimation.jl/master/examples/ECCO_standard_plots.jl)) we visualize a selection of climate-relevant variables and indices as an example. These were derived from gridded estimates of the ocean state for physical variables like temperature, salinity, and currents (see `examples/ECCO_standard_analysis.jl`) and archived using [zenodo.org](https://zenodo.org) (see [`OceanStateEstimation.ECCOdiags_download`](@ref), and [`OceanStateEstimation.ECCOdiags_add`](@ref)).

The underlying gridded fields can in turn be retrieved from [ecco-group.org](https://ecco-group.org/products.htm) and, for the `ECCOv4r2` estimate, from [Harvard Dataverse](https://dataverse.harvard.edu). Two monthly climatologies (`ECCOv4r2` and `OCCA`) are also readily available using the `Julia` artifact system as explained below. These can be relatively large files, compared to the package codes, so they are handled `lazily` (only downloaded when needed). 

| Artifact path | File Type  | Download Method |
|:----------------|:----------------:|-----------------:|
| ECCOclim_path             | NetCDF              | lazy, by variable, [dataverse](https://dataverse.harvard.edu/dataverse/ECCO?q=&types=dataverses&sort=dateSort&order=desc&page=1) |
| OCCAclim_path             | NetCDF              |lazy, by variable, [dataverse](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/RNXA2A) |
| MITPROFclim_path             | binary    | lazy, whole, [zenodo](https://zenodo.org/record/5101243#.YXiEci1h1qs) |
| ECCOdiags_path             | JLD2    | lazy, whole, [zenodo](https://zenodo.org/record/5773401#.YbQmhS1h3Pg) |

#### Basic Usage

```julia
using OceanStateEstimation
get_occa_variable_if_needed("SIarea")
readdir(OCCAclim_path)
```

or 

```julia
using OceanStateEstimation, MeshArrays
γ=GridSpec("LatLonCap",MeshArrays.GRID_LLC90)
tmp=OceanStateEstimation.get_ecco_files(γ,"ETAN")
```

## Bio-Geo-Chemical Climatology

CBIOMES-global (alpha version) is a global ocean state estimate that covers the period from 1992 to 2011. It is based on Forget et al 2015 for ocean physics MIT general circulation model and on Dutkiewicz et al 2015 for marine biogeochemistry and ecosystems Darwin Project model.

- [CBIOMES\_climatology\_plot](CBIOMES_climatology_plot.html) (➭ [code link](https://raw.githubusercontent.com/gaelforget/OceanStateEstimation.jl/master/examples/CBIOMES_climatology_plot.jl)) : visualize the climatology maps interactively using [Pluto.jl](https://github.com/fonsp/Pluto.jl/wiki/🔎-Basic-Commands-in-Pluto)
- [CBIOMES\_climatology\_create](https://gaelforget.github.io/OceanStateEstimation.jl/v0.1.13/examples/CBIOMES_model_climatogy.html) (➭ [code link](https://raw.githubusercontent.com/gaelforget/OceanStateEstimation.jl/master/examples/CBIOMES_climatology_create.jl)) : recreate the climatology file. The original is archived [here in zenodo](https://doi.org/10.5281/zenodo.5598417).

Or in the `julia REPL`, for example :

```julia
using OceanStateEstimation, NCTiles
OceanStateEstimation.CBIOMESclim_download()
fil_out=joinpath(CBIOMESclim_path,"CBIOMES-global-alpha-climatology.nc")
nc=NCTiles.NCDataset(fil_out,"r")
```

## References

- OCCA : [Forget 2010]()
- ECCO v4 : [Forget et al 2015](https://gmd.copernicus.org/articles/8/3071/2015/)
- CBIOMES-global : [Forget 2018](https://zenodo.org/record/2653669#.YbwAUi1h0ow)
	