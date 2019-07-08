# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
classifications = [
    ["Alkali Metals", "This 'group 1' of metals occupies the far left column of the periodic table. They are all soft, yet solid metals at room temperature, and are all highly reactive, for instance in contact with water."],
    ["Alkaline Earth Metals", "The elements in this series are silver-white metals at room temperature. These metals are named after their oxides whose dated names were beryllia, magnesia, lime, strontia and baryta (these oxides are alkaline when combined with water)."],
    ["Lanthanides", "This group is named after the first element in the series - Lanthanum. It occupies one of the two rows appended at the foot of the periodic table.  Lanthanides along with the chemically similar elements Scandium and Yttrium are collectively called Rare Earth Elements. "],
    ["Actinides", "Named after the first element in the series - Actinium. Occupying the second row appended at the foot of the table, actinides are all highly radioactive."],
    ["Transition Metals", "The elements of groups 4-6 are generally recognized as Transition Metals including Scandium and Yttrium from Group 3, while Zinc, Cadmium and Mercury from group 12 are generally excluded. It is, however, often convenient include elements of group 12 in a dicussion of the transition elements. Chemically, this series shows variable valency amongst its elements with properties such as being less reactive than alkali metals and generally good conductors of heat and electrical current."],
    ["Post-Transition Metals", "Lying in a region to the right of the transition metals, this series roughly forms a triangular shape. The elements in this series are soft with low melting and boiling points. They also include mercury which is liquid at room temperature."],
    ["Metalloids", "This series consists of elements whose properties are intermediate between those of metals and nonmetals leading to their use in semiconductor electronics; they're also sometimes referred to as semimetals."],
    ["Other non-metals", "In addition to halogens and noble gases, there is a collection of elements that are simply classified as 'other non-metals'. This series includes the first element (Carbon) from group 14, first two elements (Nitrogen and Phosphorus) from group 15, and the first 3 elements (Oxygen, Sulfur and Selenium) from group 16. They show a wide range of chemical properties and reactivities, and are generally poor conductors of heat and electricity. Most non-metals have the ability to gain electrons easily."],
    ["Halogens", "The term 'halogens' means 'salt-former' and compounds containing halogens are called salts. It is the only group to contain the three main states of matter at room temperature: gas (flourine and chlorine), liquid (bromine) and solid (iodine and astatine) - all non-metals."],
    ["Noble Gases", "Sometimes referred to as aerogens, this group consists of gases that are, under standard conditions, colorless, odorless, monatomic gases with very low chemical reactivity."],
    ["Unknown Chemical Properties", "This is a label reserved for synthetic elements with atomic numbers between and including 109 and 111, and 113 and 118, they typically do not occur naturally on Earth and can only be created artificially. Due to the rare and unusual nature of these elements a conclusive categorization has not yet been possible."]
]

classifications.each do |name, description|
    Classification.create(name: name, description: description)
end