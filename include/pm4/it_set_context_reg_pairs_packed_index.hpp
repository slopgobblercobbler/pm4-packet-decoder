#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetContextRegPairsPackedIndexDef {
    static constexpr std::uint8_t opcode = 0x57;
    static constexpr std::string_view name = "IT_SET_CONTEXT_REG_PAIRS_PACKED_INDEX";
    static constexpr std::string_view desc = "Write indexed packed context register pairs";
};
}
